import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { userAuth } from "@auth/interfaces/auth.interfce";

export const loginRedirectGuard: CanActivateFn = () => {
    const router = inject(Router);
    const userId: userAuth = JSON.parse(localStorage.getItem("fitzone-auth") || '{}');
    if (userId.isAuthenticated) {
        router.navigate(["/"]);
        return false;
    }
    return true;
};
