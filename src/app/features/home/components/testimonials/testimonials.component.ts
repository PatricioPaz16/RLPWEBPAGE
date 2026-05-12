import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      id: 'ricardo-santillan',
      quote: '"RLP no solo desarrolló nuestra app, rediseñó nuestra forma de interactuar con los clientes. Su metodología de entender antes de actuar fue la clave de nuestro éxito."',
      author: 'Ricardo Santillán',
      position: 'CEO, LogisticaExpress',
    },
    {
      id: 'lucia-dominguez',
      quote: '"La transparencia técnica y el compromiso con los plazos es algo que no habíamos encontrado en otras software factories. Son socios estratégicos de verdad."',
      author: 'Lucía Domínguez',
      position: 'Directora de Operaciones, RetailWorld',
    },
  ];
}
