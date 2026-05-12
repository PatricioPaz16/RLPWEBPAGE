import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProcessStep {
  id: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessComponent {
  steps: ProcessStep[] = [
    {
      id: 'consulting',
      icon: 'forum',
      title: 'Consultoría',
      description: 'Sesión estratégica para definir objetivos y arquitectura técnica.',
    },
    {
      id: 'development',
      icon: 'code',
      title: 'Desarrollo',
      description: 'Codificación ágil con sprints semanales y feedback continuo.',
    },
    {
      id: 'deployment',
      icon: 'rocket_launch',
      title: 'Despliegue',
      description: 'Lanzamiento optimizado con monitoreo de rendimiento 24/7.',
    },
  ];
}
