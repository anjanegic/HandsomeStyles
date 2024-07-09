import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'loggedInUser';

  constructor() {}

  isLoggedIn(): boolean {
    return localStorage.getItem(this.storageKey) !== null;
  }

  getUser(): any {
    const user = localStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null;
  }

  login(user: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }
}
