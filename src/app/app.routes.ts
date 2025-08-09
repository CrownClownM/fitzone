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
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [loginRedirectGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
