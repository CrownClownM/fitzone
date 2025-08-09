import { Routes } from '@angular/router';
import { LayoutAuthComponent } from '@auth/pages/layout-auth/layout-auth.component';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('@auth/components/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('@auth/components/register/register.component').then(c => c.RegisterComponent)
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
]
