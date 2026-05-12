import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {
  
  ngAfterViewInit() {
    // Si necesitas animar la entrada del header al cargar la página, lo haces aquí.
    // Si no, puedes dejar esto vacío.
  }

  scrollToSection(event: Event, sectionId: string) {
    // Prevenimos el salto brusco del href nativo
    event.preventDefault(); 
    
    // Buscamos la sección con el ID exacto
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Hacemos el scroll suave nativo del navegador
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Ya no necesitamos disparar GSAP manualmente aquí. 
      // El scroll activará los ScrollTriggers configurados en cada componente.
    } else {
      console.warn(`No se encontró la sección con el ID: ${sectionId}`);
    }
  }
}