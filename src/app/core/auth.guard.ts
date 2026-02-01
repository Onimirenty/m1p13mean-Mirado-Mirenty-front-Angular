import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  //pour securiser chaque route selon le role de chaque utilisateur
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];

    //si l'utilisateur n'est pas connecté il reviens vers login
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }


    const role = this.auth.getRole();
    if (expectedRole && role !== expectedRole) {
      // Redirige vers la page correct s'il tente d'aller a une page qui ne correspond pas a son role
      switch (role) {
        case 'admin': this.router.navigate(['/admin']); break;
        case 'boutique': this.router.navigate(['/boutique']); break;
        case 'client': this.router.navigate(['/client']); break;
      }
      return false;
    }

    return true;
  }
}
