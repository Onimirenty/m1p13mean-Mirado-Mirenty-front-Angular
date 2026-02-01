import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type Role = 'admin' | 'boutique' | 'client' |string | null;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentRole: Role = null;
  constructor(private router: Router){}
  login(username: string, password: string) {
    this.currentRole=null;
    localStorage.removeItem('role');
    // Exemple statique : on attribue un rôle selon le username
    if (username === 'admin') this.currentRole = 'admin';
    else if (username === 'boutique') this.currentRole = 'boutique';
    else if (username === 'client') this.currentRole = 'client';
    if(this.currentRole!==null)localStorage.setItem('role',this.currentRole);
    return this.getRole();
  }

  logout() {
    localStorage.removeItem('role');
    this.currentRole=null;
    this.router.navigate(['/login']);
  }

  getRole(): Role {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem('role')!==null){
      return true;
    }
    return false;
  }
}
