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
      title: 'SERVICIOS',
      links: [
        { label: 'SaaS Development', href: '#' },
        { label: 'Cloud Migration', href: '#' },
        { label: 'AI Integration', href: '#' },
      ],
    },
    {
      title: 'COMPAÑÍA',
      links: [
        { label: 'Sobre Nosotros', href: '#' },
        { label: 'Proyectos', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'LEGAL',
      links: [
        { label: 'Aviso Legal', href: '#' },
        { label: 'Privacidad', href: '#' },
        { label: 'Cookies', href: '#' },
      ],
    },
  ];

  socialIcons = ['public', 'terminal', 'hub'];
}
