import { Component, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  services = [
    { id: '01', icon: 'inventory_2', title: 'Sistemas Core', description: 'Arquitecturas robustas para flujos críticos.' },
    { id: '02', icon: 'view_in_ar', title: 'Interfaces 3D', description: 'Experiencias inmersivas de próxima generación.' },
    { id: '03', icon: 'monitoring', title: 'Analítica Avanzada', description: 'Visualización de datos en tiempo real.' },
    { id: '04', icon: 'hub', title: 'Ecosistemas Cloud', description: 'Despliegues masivos y escalabilidad total.' },
  ];

  // Guardamos una referencia para matar la animación si cambiamos de ruta
  private ctx!: gsap.Context;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Damos un margen para que Angular termine de pintar el DOM y el 3D
      setTimeout(() => {
        this.initAnimations();
      }, 100);
    }
  }

  private initAnimations() {
    const host = this.el.nativeElement;
    const titleElements = host.querySelectorAll('.s-anim');
    const cards = host.querySelectorAll('.s-card');
    const section = host.querySelector('#services-module');

    if (!section || titleElements.length === 0 || cards.length === 0) return;

    // Usamos gsap.context para encapsular las animaciones (Best practice en frameworks)
    this.ctx = gsap.context(() => {
      
      // 1. Estado inicial oculto y abajo
      gsap.set([titleElements, cards], { opacity: 0, y: 50 });

      // 2. Creamos una línea de tiempo (Timeline) amarrada a la sección
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section, // Usamos la sección interna que tiene 'min-h-screen'
          start: 'top 75%', // Se dispara cuando el top de la sección llega al 75% de tu pantalla
          
          // CRÍTICO PARA DEBUG: Descomenta la línea de abajo si SIGUE sin funcionar.
          markers: false, 
        }
      });

      // 3. Secuenciamos las animaciones
      tl.to(titleElements, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      })
      .to(cards, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
      }, "-=0.6"); // '-=0.6' hace que las tarjetas arranquen ANTES de que termine el título (más fluido)

    }, host); // Limitamos el scope al host

    // 4. Forzamos a GSAP a recalcular las posiciones de toda la página
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  }

  ngOnDestroy() {
    // Limpieza estricta: evitamos memory leaks o triggers duplicados
    if (this.ctx) {
      this.ctx.revert(); 
    }
  }
}