import { inject, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
    providedIn: "root"
})
export class ToastService {
    private _snackBar = inject(MatSnackBar);

    private _defaultConfig: MatSnackBarConfig = {
        duration: 4000,
        horizontalPosition: "right",
        verticalPosition: "top"
    };

    showSuccess(message: string) {
        this._snackBar.open(message, undefined, {
            ...this._defaultConfig,
            panelClass: ["success-toast"]
        });
    }

    showError(message: string) {
        this._snackBar.open(message, undefined, {
            ...this._defaultConfig,
            panelClass: ["error-toast"]
        });
    }

    showInfo(message: string) {
        this._snackBar.open(message, undefined, {
            ...this._defaultConfig,
            panelClass: ["info-toast"]
        });
    }

    showWarning(message: string) {
        this._snackBar.open(message, undefined, {
            ...this._defaultConfig,
            panelClass: ["warning-toast"]
        });
    }
}
