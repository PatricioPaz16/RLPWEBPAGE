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
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef
  ) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // 1. Play Video
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
    // try {
    //   await video.play();
    // } catch (err) {
    //   console.error('Video blocked:', err);
    // }
  }

  private initAnimations() {
    const host = this.el.nativeElement;
    const items = host.querySelectorAll('.c-anim');
    const section = host.querySelector('#clients-module');

    // RESET: Estado inicial invisible y escalado
    gsap.set(items, { opacity: 0, scale: 0.8, y: 50 });

    // Animación de entrada
    gsap.to(items, {
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.3,
      ease: 'expo.out',
    });
  }
}