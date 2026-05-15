import { Component, AfterViewInit, PLATFORM_ID, Inject, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements AfterViewInit {
  members = [
    {
      name: 'Patricio   Paz',
      role: 'CTO / Lead Architect',
      image: '/patito.jpeg',
      skills: ['.NET', 'Angular', 'System Design']
    },
    {
      name: 'Rodolfo   Correa',
      role: 'Frontend Engineer',
      image: '/noni.jpeg',
      skills: ['Angular', 'React', 'UI/UX']
    },
    {
      name: 'Leandro   Cancinos',
      role: 'Backend Engineer',
      image: '/Lean.jpeg',
      skills: ['Node.js', '.NET', 'SQL']
    }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  private initAnimations() {
    const host = this.el.nativeElement;
    const reveals = host.querySelectorAll('.t-reveal');
    const cards = host.querySelectorAll('.t-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#team-module',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from(reveals, {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out'
    })
    .from(cards, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out'
    }, '-=0.6');
  }
}