import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthStore } from './store/auth.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authStore: AuthStore,private auth: AuthService, private router: Router) {}

  //pour securiser chaque route selon le role de chaque utilisateur
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'];

    //si l'utilisateur n'est pas connecté il reviens vers login
    if (!this.authStore.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authStore.role();

    if (expectedRoles && !expectedRoles.includes(userRole!) ) { //si le route est defini à des rôles mais que le rôle de l'utilisateur n'y est pas inclu ==> refusé
      this.router.navigate(['/unauthorized'])
      return false
    }


    return true;
  }
}
