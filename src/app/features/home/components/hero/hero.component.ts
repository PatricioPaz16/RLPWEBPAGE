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

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {

  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  // --- CONFIGURACIÓN DE BUCLE INTERMEDIO ---
  private readonly LOOP_START_TIME = 2.0; // Inicio del bucle
  private readonly LOOP_END_TIME = 4.5;   // Final del bucle (antes de que termine el video)

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
      this.setupCustomIntervalLoop();
    }
  }

  private setupCustomIntervalLoop() {
    // if (!this.bgVideo) return;
    // const video = this.bgVideo.nativeElement;
    
    // video.muted = true;
    // video.loop = false;

    // // Usamos 'timeupdate' para monitorear el segundo exacto
    // video.addEventListener('timeupdate', () => {
    //   // Si el video alcanza el tiempo final del bucle (3.0)
    //   if (video.currentTime >= this.LOOP_END_TIME) {
    //     // Salta inmediatamente al tiempo inicial (2.0)
    //     video.currentTime = this.LOOP_START_TIME;
    //     video.play();
    //   }
    // });

    // video.play().catch(err => console.warn('Protocolo de video en espera:', err));
  }

  private initAnimations() {
    const tl = gsap.timeline();
    tl.to('.hero-reveal', {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.5
    });
  }
}
