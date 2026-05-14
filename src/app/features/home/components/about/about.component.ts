import { 
  Component, 
  AfterViewInit, 
  OnDestroy,
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
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  phases = [
    {
      number: '01',
      title: 'READ (Entender)',
      description: 'Analizamos profundamente el ADN de su negocio para identificar las necesidades críticas antes de escribir una sola línea de código.',
    },
    {
      number: '02',
      title: 'LEARN (Adaptar)',
      description: 'Iteramos y aprendemos de cada fase, adaptando las tecnologías más robustas al contexto específico de su industria.',
    },
    {
      number: '03',
      title: 'PRACTICE (Ejecutar)',
      description: 'Desplegamos soluciones de alto rendimiento con estándares de excelencia en ingeniería y soporte continuo.',
    },
  ];

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef
  ) {}

  private ctx?: gsap.Context;

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Manejo del Video
      this.setupVideo();

      // 2. Animaciones GSAP
      requestAnimationFrame(() => {
        this.initAnimations();
      });
    }
  }

  private async setupVideo() {
    // const video = this.bgVideo.nativeElement;
    // video.muted = true;
    // video.defaultMuted = true;
    // try {
    //   await video.play();
    // } catch (err) {
    //   console.error('Video autoplay blocked:', err);
    // }
  }

  private initAnimations() {
    const host = this.el.nativeElement;
    const titleElements = host.querySelectorAll('.a-anim');
    const cards = host.querySelectorAll('.a-card');
    const section = host.querySelector('#about-module');

    if (!section || titleElements.length === 0 || cards.length === 0) return;

    this.ctx = gsap.context(() => {
      gsap.set(titleElements, { opacity: 0, x: -50 });
      gsap.set(cards, { opacity: 0, y: 50 });

      gsap.to(titleElements, {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
        x: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.to(cards, {
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.2,
        ease: 'expo.out',
      });
    }, host);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}