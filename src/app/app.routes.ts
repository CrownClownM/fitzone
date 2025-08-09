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
    loadChildren: () => import('@auth/routes/auth.routes').then(r => r.AuthRoutes),
    canActivate: [loginRedirectGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
