import { Injectable } from '@angular/core';

export type Role = 'admin' | 'boutique' | 'client' | null;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentRole: Role = null;

  login(username: string, password: string) {
    this.currentRole=null;
    // Exemple statique : on attribue un rôle selon le username
    if (username === 'admin') this.currentRole = 'admin';
    else if (username === 'boutique') this.currentRole = 'boutique';
    else if (username === 'boutique') this.currentRole = 'client';

    return this.currentRole;
  }

  logout() {
    this.currentRole = null;
  }

  getRole(): Role {
    return this.currentRole;
  }

  isLoggedIn(): boolean {
    return this.currentRole !== null;
  }
}
