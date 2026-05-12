import { Component, AfterViewInit, PLATFORM_ID, Inject, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements AfterViewInit {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef
  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        this.initAnimations();
      });
    }
  }

  private initAnimations() {
    const host = this.el.nativeElement;
    const reveals = host.querySelectorAll('.contact-reveal');
    const section = host.querySelector('#contact-module');

    // RESET: Estado inicial
    gsap.set(reveals, { opacity: 0, y: 50 });

    // Animación de entrada vinculada al Scroll
    gsap.to(reveals, {
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out',
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      setTimeout(() => {
        this.isSubmitting = false;
        this.contactForm.reset();
      }, 2000);
    }
  }
}