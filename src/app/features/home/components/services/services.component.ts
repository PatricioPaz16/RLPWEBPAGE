import {
  Component,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  ViewChild,
  ElementRef
} from '@angular/core';
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
    {
      icon: 'inventory_2',
      title: 'Sistemas Core',
      description: 'Arquitecturas robustas para flujos críticos.',
    },
    {
      icon: 'view_in_ar',
      title: 'Interfaces 3D',
      description: 'Experiencias inmersivas de próxima generación.',
    },
    {
      icon: 'monitoring',
      title: 'Analítica Avanzada',
      description: 'Visualización de datos en tiempo real.',
    },
    {
      icon: 'hub',
      title: 'Ecosistemas Cloud',
      description: 'Despliegues masivos y escalabilidad total.',
    },
  ];
  @ViewChild('bgVideo')
  bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
  ) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Usamos requestAnimationFrame para asegurar que el DOM está listo antes de GSAP
      requestAnimationFrame(() => {
        this.initAnimations();
      });

           const video = this.bgVideo.nativeElement;

      video.muted = true;
      video.defaultMuted = true;

      try {

        await video.play();

      } catch (err) {

        console.error('Video autoplay bloqueado:', err);

      }
    }
  }

  private initAnimations() {
    const host = this.el.nativeElement;
    const titleElements = host.querySelectorAll('.s-anim');
    const cards = host.querySelectorAll('.s-card');
    const section = host.querySelector('#services-module');

    // 1. RESET MANUAL: Forzamos el estado invisible antes de que actúe el ScrollTrigger
    gsap.set([titleElements, cards], { opacity: 0, y: 100 });

    // 2. ANIMACIÓN DEL TÍTULO
    gsap.to(titleElements, {
      scrollTrigger: {
        trigger: section,
        start: 'top 60%', // Solo arranca cuando la sección está bien entrada
        toggleActions: 'play none none reverse',
      },
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out',
    });

    // 3. ANIMACIÓN DE LAS TARJETAS
    gsap.to(cards, {
      scrollTrigger: {
        trigger: section,
        start: 'top 40%',
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out',
      delay: 0.3,
    });
  }
}
