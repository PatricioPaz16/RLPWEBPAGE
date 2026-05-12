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
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements AfterViewInit {
  steps = [
    {
      icon: 'forum',
      title: 'Consultoría',
      description: 'Sesión estratégica para definir objetivos y arquitectura técnica.',
    },
    {
      icon: 'code',
      title: 'Desarrollo',
      description: 'Codificación ágil con sprints semanales y feedback continuo.',
    },
    {
      icon: 'rocket_launch',
      title: 'Despliegue',
      description: 'Lanzamiento optimizado con monitoreo de rendimiento 24/7.',
    },
  ];

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef
  ) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Manejo del Video Portal
      this.setupVideo();

      // Animaciones GSAP por ElementRef
      requestAnimationFrame(() => {
        this.initAnimations();
      });
    }
  }

  private async setupVideo() {
    const video = this.bgVideo.nativeElement;
    video.muted = true;
    try {
      await video.play();
    } catch (err) {
      console.error('Video autoplay blocked:', err);
    }
  }

  private initAnimations() {
    const host = this.el.nativeElement;
    const titleElements = host.querySelectorAll('.p-anim');
    const stepsElements = host.querySelectorAll('.p-step');
    const section = host.querySelector('#process-module');

    // RESET MANUAL: Aseguramos que la animación se dispare de nuevo al entrar
    gsap.set(titleElements, { opacity: 0, y: 50 });
    gsap.set(stepsElements, { opacity: 0, y: 30 });

    // Timeline para secuencia perfecta
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%', // Disparo cuando el imán del snap nos deje aquí
        toggleActions: 'play none none reverse',
      }
    });

    tl.to(titleElements, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out'
    })
    .to(stepsElements, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'expo.out',
    }, '-=0.5'); // Comienza antes de que termine el título
  }
}