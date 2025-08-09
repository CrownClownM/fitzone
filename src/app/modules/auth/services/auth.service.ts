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
    this.loadFromStorage();
  }

  login(email: string, password: string) {
    return from(this._userStorage.getUserByEmail(email)).pipe(
      delay(1000),
      map(user => {
        const success = !!user && user.password === password;
        if (success) {
          // Evitamos guardar la password en memoria
          const { password: _, ...safeUser } = user;
          this.setAuthState(safeUser, true);
        }
        return success;
      })
    );
  }

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
        this.setAuthState(safeUser, true);
        return true;
      })
    );
  }

  logout(): void {
    this.setAuthState(null, false);
  }

  private setAuthState(user: User | null, isAuth: boolean): void {
    this._user.set(user);
    this._isAuthenticated.set(isAuth);
    this.saveToStorage(user, isAuth);
  }

  private saveToStorage(user: User | null, isAuth: boolean): void {
    localStorage.setItem(
      'fitzone-auth',
      JSON.stringify({ user, isAuthenticated: isAuth })
    );
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem('fitzone-auth');
    if (data) {
      const { user, isAuthenticated } = JSON.parse(data);
      this._user.set(user);
      this._isAuthenticated.set(isAuthenticated);
    }
  }
}
