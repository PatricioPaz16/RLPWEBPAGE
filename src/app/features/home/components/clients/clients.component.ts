import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ClientProject {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {
  clients = ['TECHCORP', 'DATASTREAM', 'NEXUS AI', 'VELOCITY', 'BLUECLOUD'];

  projects: ClientProject[] = [
    {
      id: 'nexus-banking',
      category: 'FINTECH',
      title: 'Nexus Mobile Banking',
      description: 'Escalabilidad de 0 a 100k usuarios en 6 meses.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmZza1ljQ6DoNE9Qa0wHMd3VzYpMny4TiwUrJGpy_QanreAgJasZiiJ8JBm8G2oaYUOWb_N8qEJMIXNDPHijM48wXEQCWwMnPZ_OJXxghINmmvpBvlrpXoCoAx0-AGvkV8gd8RT7wrfIfoUHb1LaJpOtkq7NzVLerqLlHJ3HpHpLOiJYRkloMSCh-byGUtlqclkcSTgpCQ7RzujjzQbRROV9Ok8uE3fN1lD6dV20BSXKV6E9JkXKS1mbnLq9wHwJZRTDOz7ttvzh71',
    },
    {
      id: 'smart-fleet',
      category: 'LOGÍSTICA',
      title: 'Smart Fleet Tracking',
      description: 'Optimización del 25% en rutas de distribución.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYLZFb5yfdAOt6172Z8lcUVZCOs-RhSyVWbFVQFcJMSnMCZwM62NH9mdN04GyoFImgr9zQ7yN64lIRHPZE3RPxSraNk47LTbZBlykTtGnoBdmRXlg3qVDfYcEMpsu4DRGpgyWBpdo2dQj8vTRM4d0-jD00YC4A5UymwL8zyp8I3ko2od83_6TNAInh-BGW_Xhk7b-Am8RMD0RlRdHiRXO87Nnow4RWYnCaBsxCJ1_9Hs1jQSyc2ok88oy4aIPmZSM4tYfoX_74zZSD',
    },
    {
      id: 'global-retail',
      category: 'E-COMMERCE',
      title: 'Global Retail Hub',
      description: 'Integración de pagos en 12 países simultáneos.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPlqC7EXLjqG5ANHbYGN5TiJ6yzil93zmFtIfysF5N0803RD6wZ4L4SKHHDYHIYkhi-o3exSoJjtWg4Ho0WvNaGLGYAFylaTFHVlpAXsH2wfg5Y3YU0TIGbjFOVQqzcMmKUZKE6l74HmFuxau2-UHCBQS9spRiQrR_E8ALHij4ic-IU6SI69DlMjkxP0iCPHztSSqPCOSQxz08YAGa3gd_GVt0PPv7drRKajqlJ0JssBexNtORoUfkDqdSA8e9YqMnnDDqJSoBwiOQ',
    },
  ];
}
