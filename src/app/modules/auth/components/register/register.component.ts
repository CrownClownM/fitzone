import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { ToastService } from '@shared/services/toast.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  loginForm: FormGroup;
  showPassword = false;
  showVerifyPassword = false;
  isLoading = false;

  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _toastService = inject(ToastService);
  private _fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this._initializeForm();
  }

  private _initializeForm(): FormGroup {
    return this._fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
          ],
        ],
        password: ['', Validators.required],
        verifyPassword: ['', Validators.required],
      },
      { validators: this._passwordMatchValidator }
    );
  }

  private _passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const verifyPassword = group.get('verifyPassword')?.value;
    return password === verifyPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { name, email, password } = this.loginForm.value;

    this._authService.register(name, email, password).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this._router.navigate(['/']);
          this._toastService.showSuccess('¡Registro exitoso! Bienvenido');
        } else {
          this._toastService.showError('Ya existe este correo');
        }
      },
      error: () => {
        this.isLoading = false;
        this._toastService.showError('Ocurrió un error inesperado.');
      },
    });
  }
}
