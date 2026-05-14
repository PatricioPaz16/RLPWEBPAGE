import { Component, AfterViewInit, PLATFORM_ID, Inject, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EmailService, EmailResponse } from '../../../../services/email.service';

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
  isSubmitting = signal(false);
  submitMessage = signal('');

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef,
    private emailService: EmailService,
    private cdr: ChangeDetectorRef
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
      this.isSubmitting.set(true);
      this.submitMessage.set('');

      const formData = this.contactForm.value;
      
      this.emailService.sendContactEmail({
        senderEmail: formData.email,
        message: formData.message,
        subject: 'RLP Software Factory - Solicitud de Auditoría'
      }).subscribe({
        next: (response: EmailResponse) => {
          this.isSubmitting.set(false);
          this.submitMessage.set('¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.');
          this.contactForm.reset();
          this.cdr.markForCheck();
          
          // Limpiar mensaje después de 5 segundos
          setTimeout(() => {
            this.submitMessage.set('');
            this.cdr.markForCheck();
          }, 5000);
        },
        error: (error: Error) => {
          this.isSubmitting.set(false);
          this.submitMessage.set('Error al enviar el mensaje. Por favor, intenta de nuevo.');
          this.cdr.markForCheck();
          
          console.error('Error sending email:', error);
          
          // Limpiar mensaje después de 5 segundos
          setTimeout(() => {
            this.submitMessage.set('');
            this.cdr.markForCheck();
          }, 5000);
        }
      });
    }
  }
}
