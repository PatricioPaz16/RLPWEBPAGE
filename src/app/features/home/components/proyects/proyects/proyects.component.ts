import { Component, AfterViewInit, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-proyects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss']
})
export class ProjectsComponent implements AfterViewInit {
  
projects = [
  {
    id: '01',
    title: 'Enterprise Core',
    description: 'Arquitectura headless de alto rendimiento con microfrontends integrados.',
    image: 'assets/projects/project1.jpg',
    tags: ['Angular', '.NET Core', 'Micro Frontends'], // Personalizado a tu stack
    size: 'wide' // Ocupa 2 columnas a lo ancho
  },
  {
    id: '02',
    title: '3D UI Engine',
    description: 'Componentes espaciales para visualización de datos.',
    image: 'assets/projects/project2.jpg',
    tags: ['Three.js', 'GSAP'],
    size: 'square' // Ocupa 1 columna
  },
  {
    id: '03',
    title: 'Game Systems',
    description: 'Lógica multiplayer y DataStores optimizados.',
    image: 'assets/projects/project3.jpg',
    tags: ['Luau', 'Roblox Studio'],
    size: 'square' // Ocupa 1 columna
  },
  {
    id: '04',
    title: 'Logistics App',
    description: 'Ecosistema móvil multiplataforma para tracking industrial.',
    image: 'assets/projects/project4.jpg',
    tags: ['React Native', 'Node.js', 'SQL'],
    size: 'wide' // Ocupa 2 columnas a lo ancho
  }
];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => this.initAnimations());
    }
  }

  private initAnimations() {
    const host = this.el.nativeElement;
    const cards = host.querySelectorAll('.p-card');
    const header = host.querySelector('.p-header');

    gsap.set([cards, header], { opacity: 0, y: 40 });

    gsap.to(header, {
      scrollTrigger: { trigger: header, start: 'top 85%' },
      opacity: 1, y: 0, duration: 1.2, ease: 'power3.out'
    });

    gsap.to(cards, {
      scrollTrigger: { trigger: host.querySelector('.p-grid'), start: 'top 75%' },
      opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'expo.out'
    });
  }
}