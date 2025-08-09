import { Routes } from '@angular/router';
import { loginRedirectGuard } from '@core/guards/login-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/pages/main/main.component').then(
        (m) => m.MainComponent
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@auth/routes/auth.routes').then((r) => r.AuthRoutes),
    canActivate: [loginRedirectGuard],
  },
  {
    path: 'classes',
    loadComponent: () =>
      import('@home/pages/gym-classes/gym-classes.component').then(
        (m) => m.GymClassesComponent
      ),
  },
  {
    path: 'centers',
    loadComponent: () =>
      import('@home/pages/centers/centers.component').then(
        (m) => m.CentersComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
