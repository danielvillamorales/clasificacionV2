import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clasificacion',
    title: 'Clasificacion',
    loadComponent: () =>
      import('./clasificacion/pages/clasificacion/clasificacion.component'),
  },
  {
    path: 'dotacionka',
    title: 'Importacion Dotacion KA',
    loadComponent: () =>
      import('./dotacion_personal/pages/dotacion/dotacion.component'),
  },
  {
    path: '',
    redirectTo: 'clasificacion',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'clasificacion',
  },
];
