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

  @ViewChild('bgVideo')
  bgVideo!: ElementRef<HTMLVideoElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {

      this.initAnimations();

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

    const tl = gsap.timeline();

    tl.to('.hero-reveal', {
      y: 0,
      opacity: 1,
      duration: 1.8,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.2
    });
  }
}