import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  signal,
  Inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  label: string;
  shortLabel: string;
  id: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  activeSection = signal('hero');
  mobileMenuOpen = signal(false);
  navItems: NavItem[] = [
    { label: 'Inicio', shortLabel: 'Inicio', id: 'hero', icon: 'home' },
    { label: 'Servicios', shortLabel: 'Servicios', id: 'servicios', icon: 'deployed_code' },
    { label: 'Metodologia', shortLabel: 'Metodo', id: 'metodologia', icon: 'neurology' },
    { label: 'Clientes', shortLabel: 'Clientes', id: 'clientes', icon: 'groups' },
    { label: 'Proyectos', shortLabel: 'Proyectos', id: 'proyectos', icon: 'apps' },
    { label: 'RoadMap', shortLabel: 'RoadMap', id: 'roadmap', icon: 'alt_route' },
    { label: 'Equipo', shortLabel: 'Equipo', id: 'equipo', icon: 'engineering' },
    { label: 'Contacto', shortLabel: 'Contacto', id: 'contacto', icon: 'mail' },
  ];

  private sectionObserver?: IntersectionObserver;
  private snapResetTimeoutId?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    requestAnimationFrame(() => {
      this.setupSectionObserver();
      ScrollTrigger.refresh();
    });
  }

  ngOnDestroy() {
    this.sectionObserver?.disconnect();
    if (this.snapResetTimeoutId) {
      window.clearTimeout(this.snapResetTimeoutId);
    }
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.classList.remove('is-nav-scrolling');
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.innerWidth >= 768) {
      this.mobileMenuOpen.set(false);
    }
    ScrollTrigger.refresh();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((open) => !open);
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();

    if (!isPlatformBrowser(this.platformId)) return;

    if (window.innerWidth < 768) {
      this.mobileMenuOpen.set(false);
    }

    this.activeSection.set(sectionId);
    this.scrollToSectionById(sectionId, 0);
  }

  private scrollToSectionById(sectionId: string, attempt: number) {
    const section = document.getElementById(sectionId);

    if (section) {
      const targetY = this.getSectionTargetY(section);

      document.documentElement.classList.add('is-nav-scrolling');
      if (this.snapResetTimeoutId) {
        window.clearTimeout(this.snapResetTimeoutId);
      }

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });

      history.replaceState(null, '', `#${sectionId}`);

      if (window.innerWidth >= 768) {
        window.setTimeout(() => {
          this.fineTuneHeadingAlignment(section);
        }, 560);
      }

      this.snapResetTimeoutId = window.setTimeout(() => {
        document.documentElement.classList.remove('is-nav-scrolling');
      }, 1300);

      window.setTimeout(() => {
        ScrollTrigger.update();
        ScrollTrigger.refresh();
      }, 420);
      return;
    }

    if (attempt < 8) {
      window.setTimeout(() => {
        this.scrollToSectionById(sectionId, attempt + 1);
      }, 120);
      return;
    }

    console.warn(`No se encontro la seccion con el ID: ${sectionId}`);
  }

  private getSectionTargetY(section: HTMLElement): number {
    const isMobile = window.innerWidth < 768;
    const titleViewportY = isMobile ? 92 : 136;
    const sectionOffsetY = isMobile ? 16 : 80;

    const heading = section.querySelector('h1, h2') as HTMLElement | null;
    if (heading) {
      const headingY = heading.getBoundingClientRect().top + window.scrollY;
      return Math.max(0, headingY - titleViewportY);
    }

    const sectionY = section.getBoundingClientRect().top + window.scrollY;
    return Math.max(0, sectionY - sectionOffsetY);
  }

  private fineTuneHeadingAlignment(section: HTMLElement): void {
    const heading = section.querySelector('h1, h2') as HTMLElement | null;
    if (!heading) return;

    const isMobile = window.innerWidth < 768;
    const titleViewportY = isMobile ? 104 : 136;
    const delta = heading.getBoundingClientRect().top - titleViewportY;

    if (Math.abs(delta) < 2) return;

    window.scrollBy({
      top: delta,
      behavior: 'auto',
    });
  }

  private setupSectionObserver() {
    this.sectionObserver?.disconnect();

    const sections = this.navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    if (sections.length === 0) return;

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          this.activeSection.set(visible[0].target.id);
        }
      },
      {
        threshold: [0.25, 0.4, 0.6, 0.8],
        rootMargin: '-18% 0px -45% 0px',
      }
    );

    sections.forEach((section) => this.sectionObserver?.observe(section));
  }
}
