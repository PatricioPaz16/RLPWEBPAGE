import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RlpPhase {
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  phases: RlpPhase[] = [
    {
      number: '01',
      title: 'READ (Entender)',
      description: 'Analizamos profundamente el ADN de su negocio para identificar las necesidades críticas antes de escribir una sola línea de código.',
    },
    {
      number: '02',
      title: 'LEARN (Adaptar)',
      description: 'Iteramos y aprendemos de cada fase, adaptando las tecnologías más robustas al contexto específico de su industria.',
    },
    {
      number: '03',
      title: 'PRACTICE (Ejecutar)',
      description: 'Desplegamos soluciones de alto rendimiento con estándares de excelencia en ingeniería y soporte continuo.',
    },
  ];

  images = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDRaxrTGPIIE8orMw9S08r0H4866xjwWgT8IydTv8wUkcioAuJ7t7UzhCyaSO8k_ejXB5L4sdvmY9pVSglBOPDtmXI83Xh197brYU9g5ZJQWWzjNw-O3n_6YVFn2LXw0cW8DIvdmrjCa33_JEYmQzSAWPRp_SUBce-8mS1RHIoY2mWcHtwM66foMHlaY_OEfjxZVq3rDCnfn5kUkqmaiU43cV7yTRMR2_wdOnUYwUdqwABHsi9A8ht_h1ngwGTekFi0_I7uHuXxudJE',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBtzcYx9K76VesbyDnMun1qTYTxiVWMi8B4LQwghC5H2t9D4HaNl-lsJipguU0ZmZUDNOuXk7LnNIn1EY2K8su683RTXfxB5LlNUyhXOZakx0YNEdjzReS4GN2eYBBoo1uNlPlmp6Mw47S_ZBOTQ-40YPSatpDfnIFnPCDPhC6ktfcALbsjsd1RxrY9IwvnTugI_F-1qGKlsYONBDi5bkW6oB0oAO7pvMmPWjKnqKt74pxsxbOES3hPxxCn-9X3V1FspSMAikon2Rvt',
  ];
}
