import { Component, AfterViewInit, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
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
export class ServicesComponent implements AfterViewInit {
  services = [
    { id: '01', icon: 'inventory_2', title: 'Sistemas Core', description: 'Arquitecturas robustas para flujos críticos.' },
    { id: '02', icon: 'view_in_ar', title: 'Interfaces 3D', description: 'Experiencias inmersivas de próxima generación.' },
    { id: '03', icon: 'monitoring', title: 'Analítica Avanzada', description: 'Visualización de datos en tiempo real.' },
    { id: '04', icon: 'hub', title: 'Ecosistemas Cloud', description: 'Despliegues masivos y escalabilidad total.' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Usamos un pequeño delay para asegurar que el DOM y el motor 3D ya estén listos
      setTimeout(() => {
        this.initAnimations();
      }, 500);
    }
  }

  private initAnimations() {
    const host = this.el.nativeElement;
    const titleElements = host.querySelectorAll('.s-anim');
    const cards = host.querySelectorAll('.s-card');
    const section = host.querySelector('#services-module');

    if (!section) return; // Guard para evitar errores de nativeElement

    // Configuramos el estado inicial con GSAP en lugar de CSS
    gsap.set([titleElements, cards], { opacity: 0, y: 30 });

    gsap.to(titleElements, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.to(cards, {
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
      },
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }
}