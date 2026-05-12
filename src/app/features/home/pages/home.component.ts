import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from '../components/hero/hero.component';
import { ServicesComponent } from '../components/services/services.component';
import { AboutComponent } from '../components/about/about.component';
import { ClientsComponent } from '../components/clients/clients.component';
import { ProcessComponent } from '../components/process/process.component';
import { TeamComponent } from '../components/team/team.component';
import { TestimonialsComponent } from '../components/testimonials/testimonials.component';
import { ContactComponent } from '../components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ServicesComponent,
    AboutComponent,
    ClientsComponent,
    ProcessComponent,
    TeamComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
