import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  services: Service[] = [
    {
      id: 'software-enlatado',
      icon: 'inventory_2',
      title: 'Software Enlatado',
      description: 'Soluciones modulares listas para escalar y optimizar sus flujos operativos existentes.',
    },
    {
      id: 'landing-pages',
      icon: 'web',
      title: 'Landing Pages',
      description: 'Interfaces de conversión de alto impacto diseñadas con precisión técnica y estética.',
    },
    {
      id: 'pyme-gestion',
      icon: 'business_center',
      title: 'Gestión PYME',
      description: 'Digitalización integral para pequeñas y medianas empresas con foco en la rentabilidad.',
    },
    {
      id: 'app-development',
      icon: 'smartphone',
      title: 'App Development',
      description: 'Desarrollo móvil nativo y multiplataforma con experiencias de usuario fluidas.',
    },
  ];
}
