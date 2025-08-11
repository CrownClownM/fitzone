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

    /**
     * Muestra un mensaje de éxito.
     * @param message Mensaje a mostrar.
     */
    showSuccess(message: string) {
        this._snackBar.open(message, undefined, {
            ...this._defaultConfig,
            panelClass: ["success-toast"]
        });
    }

    /**
     * Muestra un mensaje de error.
     * @param message Mensaje a mostrar.
     */
    showError(message: string) {
        this._snackBar.open(message, undefined, {
            ...this._defaultConfig,
            panelClass: ["error-toast"]
        });
    }

    /**
     * Muestra un mensaje de información.
     * @param message Mensaje a mostrar.
     */
    showInfo(message: string) {
        this._snackBar.open(message, undefined, {
            ...this._defaultConfig,
            panelClass: ["info-toast"]
        });
    }

    /**
     * Muestra un mensaje de advertencia.
     * @param message Mensaje a mostrar.
     */
    showWarning(message: string) {
        this._snackBar.open(message, undefined, {
            ...this._defaultConfig,
            panelClass: ["warning-toast"]
        });
    }
}
