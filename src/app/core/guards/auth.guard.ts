import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { userAuth } from '@auth/interfaces/auth.interfce';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);

  let stored: userAuth | null = null;
  try {
    stored = JSON.parse(localStorage.getItem('fitzone-auth') || 'null');
  } catch {
    stored = null;
  }

  const isValid = !!stored && !!stored.isAuthenticated && !!stored.user?.id;

  if (!isValid) {
    return router.createUrlTree(['/auth/login']);
  }
  return true;
};
