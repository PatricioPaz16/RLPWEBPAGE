import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
