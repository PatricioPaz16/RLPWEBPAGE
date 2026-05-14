import { Injectable, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Injectable({
  providedIn: 'root'
})
export class AnimationService implements OnDestroy {
  private observers: IntersectionObserver[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollRefresh();
    }
  }

  /**
   * Configura el refresco automático de ScrollTrigger al hacer scroll
   */
  private setupScrollRefresh() {
    // Escucha cambios en el scroll y actualiza ScrollTrigger
    document.addEventListener('scroll', () => {
      gsap.delayedCall(0.1, () => {
        ScrollTrigger.refresh();
      });
    }, { passive: true });

    // También actualiza cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
      gsap.delayedCall(0.5, () => {
        ScrollTrigger.refresh();
      });
    });
  }

  /**
   * Força un refresco inmediato de ScrollTrigger
   */
  refreshScrollTriggers() {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.refresh();
    }
  }

  /**
   * Anima elementos cuando entran al viewport
   */
  animateOnScroll(
    selector: string,
    options: {
      duration?: number;
      stagger?: number;
      ease?: string;
      delay?: number;
      triggerStart?: string;
      triggerEnd?: string;
    } = {}
  ) {
    if (!isPlatformBrowser(this.platformId)) return;

    const {
      duration = 1,
      stagger = 0.1,
      ease = 'power4.out',
      delay = 0,
      triggerStart = 'top 60%',
      triggerEnd = 'bottom 0%'
    } = options;

    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    // Reset inicial
    gsap.set(elements, { opacity: 0, y: 30 });

    // Animar al hacer scroll
    gsap.to(elements, {
      scrollTrigger: {
        trigger: elements[0].parentElement,
        start: triggerStart,
        end: triggerEnd,
        toggleActions: 'play none none reverse',
        once: false
      },
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      delay
    });
  }

  /**
   * Limpia todos los observers y triggers
   */
  ngOnDestroy() {
    this.observers.forEach(observer => observer.disconnect());
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}
