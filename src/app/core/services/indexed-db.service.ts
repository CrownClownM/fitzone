import { Injectable } from '@angular/core';
import { User } from '@auth/interfaces/auth.interfce';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbName = 'authDB';
  private storeName = 'users';

  private mockUsers: (User & { password: string })[] = [
    { id: '1', name: 'Test User', email: 'test@fitzone.com', password: 'password123' },
    { id: '2', name: 'Steven Medina', email: 'medina@fitzone.com', password: 'password123' }
  ];

  constructor() {
    this.initDB();
  }

  private initDB(): void {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      this.ensureMockUsers();
    };
  }

  private async ensureMockUsers(): Promise<void> {
    const users = await this.getAllUsers();
    if (users.length === 0) {
      for (const user of this.mockUsers) {
        await this.saveUser(user);
      }
    }
  }

  saveUser(user: User & { password: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        store.put(user);

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  getUserByEmail(email: string): Promise<(User & { password: string }) | null> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this.storeName], 'readonly');
        const store = tx.objectStore(this.storeName);
        const users: (User & { password: string })[] = [];

        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            if (cursor.value.email === email) {
              resolve(cursor.value);
              return;
            }
            cursor.continue();
          } else {
            resolve(null);
          }
        };

        cursorRequest.onerror = () => reject(cursorRequest.error);
      };

      request.onerror = () => reject(request.error);
    });
  }

  getAllUsers(): Promise<(User & { password: string })[]> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const tx = db.transaction([this.storeName], 'readonly');
        const store = tx.objectStore(this.storeName);
        const users: (User & { password: string })[] = [];

        const cursorRequest = store.openCursor();
        cursorRequest.onsuccess = (e: any) => {
          const cursor = e.target.result;
          if (cursor) {
            users.push(cursor.value);
            cursor.continue();
          } else {
            resolve(users);
          }
        };

        cursorRequest.onerror = () => reject(cursorRequest.error);
      };

      request.onerror = () => reject(request.error);
    });
  }
}
