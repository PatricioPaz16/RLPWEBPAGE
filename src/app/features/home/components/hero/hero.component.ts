import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  heroImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxm6IJythLl1qb2iee2yoHnc_PA5kGXWZOaYjwuvtp1sp9BxmljkuQzv8JMkJvpGqkKq_5iNHrceYp7u6mxqpWXwP5_EJij-3c-WdGtRgjhThF41zjmK34Vg28-wc1J92OnPMjhm1xt9XaMdqmMKzVX9zFfCpD_KdTO7OtOZkNK4eVK_VtRxGQsdXrcL7h8yR62c3fMFK3PsJKdiQYyEyrVVclWg7ePNyBqQJhYSz5AZCnQXQMTUD1kS-QuRiywhzy7v9PP0uteC4e';

  onCtaClick(): void {
    console.log('Starting project...');
  }

  onPortfolioClick(): void {
    console.log('View portfolio...');
  }
}
