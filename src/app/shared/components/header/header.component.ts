import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
export class HeaderComponent {
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
}
