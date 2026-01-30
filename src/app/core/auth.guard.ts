import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; 

    //si l'utilisateur n'est pas connecté il reviens vers login
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }


    const role = this.auth.getRole();
    if (expectedRole && role !== expectedRole) {
      // Redirige vers le dashboard correct si le rôle ne correspond pas
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
