import { Injectable } from '@angular/core';

export interface AuthUser {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: AuthUser | null = null;

  constructor() {
    const stored = localStorage.getItem('auth_user');
    if (stored) this.user = JSON.parse(stored);
  }

  login(name: string, email: string): void {
    this.user = { name, email };
    localStorage.setItem('auth_user', JSON.stringify(this.user));
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('auth_user');
  }

  get currentUser(): AuthUser | null {
    return this.user;
  }

  get isLoggedIn(): boolean {
    return this.user !== null;
  }
}