import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  navLinks: NavLink[] = [
    { label: 'Servicios', href: '#servicios', isActive: true },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Equipo', href: '#equipo' },
    { label: 'Blog', href: '#blog' },
  ];

  onNavClick(link: NavLink): void {
    this.navLinks.forEach(l => l.isActive = false);
    link.isActive = true;
  }

  ngAfterViewInit() {
    // Reveal animación (opcional)
    if (typeof window !== 'undefined') {
      const tl = gsap.timeline();
      tl.from('.reveal-item', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: 'power4.out'
      }, "-=1.8");
    }
  }

  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Disparar animaciones si la sección tiene elementos animados
      setTimeout(() => {
        // Hero
        if (sectionId === 'hero') {
          const heroEls = section.querySelectorAll('.hero-reveal');
          if (heroEls.length > 0 && window['gsap']) {
            window['gsap'].fromTo(heroEls, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power4.out' });
          }
        }
        // Puedes agregar más triggers para otras secciones aquí si lo deseas
      }, 400);
    }
  }
}
