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
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements AfterViewInit, OnDestroy {
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
  private ctx?: gsap.Context;

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
    // const video = this.bgVideo.nativeElement;
    // video.muted = true;
    // try {
    //   await video.play();
    // } catch (err) {
    //   console.error('Video autoplay blocked:', err);
    // }
  }

  private initAnimations() {
    const host = this.el.nativeElement;
    const titleElements = host.querySelectorAll('.p-anim');
    const stepsElements = host.querySelectorAll('.p-step');
    const section = host.querySelector('#process-module');

    if (!section || titleElements.length === 0 || stepsElements.length === 0) return;

    this.ctx = gsap.context(() => {
      gsap.set(titleElements, { opacity: 0, y: 50 });
      gsap.set(stepsElements, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        }
      });

      tl.to(titleElements, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      })
      .to(stepsElements, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'expo.out',
      }, '-=0.45');
    }, host);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}