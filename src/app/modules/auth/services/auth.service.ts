import { inject, Injectable, signal, computed } from '@angular/core';
import { from, map, delay } from 'rxjs';
import { User } from '@auth/interfaces/auth.interfce';
import { IndexedDbService } from '@core/services/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);
  private _isAuthenticated = signal<boolean>(false);

  user = computed(() => this._user());
  isAuthenticated = computed(() => this._isAuthenticated());

  private _userStorage = inject(IndexedDbService);

  constructor() {
    this._loadFromStorage();
  }

  /**
   * Inicia sesión con el usuario.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Observable<boolean> que indica si el inicio de sesión fue exitoso.
   */
  login(email: string, password: string) {
    return from(this._userStorage.getUserByEmail(email)).pipe(
      delay(1000),
      map(user => {
        const success = !!user && user.password === password;
        if (success) {
          const { password: _, ...safeUser } = user;
          this._setAuthState(safeUser, true);
        }
        return success;
      })
    );
  }

  /**
   * Registra un nuevo usuario.
   * @param name Nombre del usuario.
   * @param email Correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Observable<boolean> que indica si el registro fue exitoso.
   */
  register(name: string, email: string, password: string) {
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      name,
      email,
      password
    };
    return from(this._userStorage.saveUser(newUser)).pipe(
      delay(1000),
      map(() => {
        const { password: _, ...safeUser } = newUser;
        this._setAuthState(safeUser, true);
        return true;
      })
    );
  }

  /**
   * Cierra sesión del usuario.
   */
  logout(): void {
    this._setAuthState(null, false);
  }

  /**
   * Establece el estado de autenticación del usuario.
   * @param user Usuario autenticado o null si se cierra sesión.
   * @param isAuth Estado de autenticación.
   */
  private _setAuthState(user: User | null, isAuth: boolean): void {
    this._user.set(user);
    this._isAuthenticated.set(isAuth);
    this._saveToStorage(user, isAuth);
  }

  /**
   * Guarda el estado de autenticación en el almacenamiento local.
   * @param user Usuario autenticado o null si se cierra sesión.
   * @param isAuth Estado de autenticación.
   */
  private _saveToStorage(user: User | null, isAuth: boolean): void {
    localStorage.setItem(
      'fitzone-auth',
      JSON.stringify({ user, isAuthenticated: isAuth })
    );
  }

  /**
   * Carga el estado de autenticación desde el almacenamiento local.
   */
  private _loadFromStorage(): void {
    const data = localStorage.getItem('fitzone-auth');
    if (data) {
      const { user, isAuthenticated } = JSON.parse(data);
      this._user.set(user);
      this._isAuthenticated.set(isAuthenticated);
    }
  }
}
