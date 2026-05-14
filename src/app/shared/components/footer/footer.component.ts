import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerSections: FooterSection[] = [
    {
      title: 'NAVEGACION',
      links: [
        { label: 'Inicio', href: '#hero' },
        { label: 'Servicios', href: '#servicios' },
        { label: 'Metodologia', href: '#metodologia' },
        { label: 'Proyectos', href: '#proyectos' },
      ],
    },
    {
      title: 'SOLUCIONES',
      links: [
        { label: 'Sistemas Core', href: '#servicios' },
        { label: 'Interfaces 3D', href: '#servicios' },
        { label: 'RoadMap', href: '#roadmap' },
        { label: 'Equipo', href: '#equipo' },
      ],
    },
    {
      title: 'CONTACTO',
      links: [
        { label: 'Formulario', href: '#contacto' },
        { label: 'contacto@rlpsoftwarefactory.com', href: 'mailto:contacto@rlpsoftwarefactory.com' },
        { label: '+54 11 0000 0000', href: 'tel:+541100000000' },
      ],
    },
  ];

  socialLinks: SocialLink[] = [
    { icon: 'public', href: 'https://www.linkedin.com', label: 'LinkedIn' },
    { icon: 'terminal', href: '#servicios', label: 'Servicios' },
    { icon: 'hub', href: '#contacto', label: 'Contacto' },
  ];
}
