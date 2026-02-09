import { Component, signal } from '@angular/core';
import { FooterComponent } from "../../../layouts/footer/footer.component";
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../core/store/auth.store';
import { ROLE_REDIRECT } from '../../../core/auth.service';

@Component({
  selector: 'app-home',
  imports: [FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isMenuOpen = signal(false);
  constructor(private authStore:AuthStore,private router:Router){
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
  decouvrir(){
    if(!this.authStore.token){ // si c'est pas un utilisateur authentifié
      this.authStore.setUser({ email:'Visiteur',role:'VISITOR' });
      if(!this.authStore.visitorKey){
        this.authStore.visitorKey=crypto.randomUUID(); //generer une clé pour visiteur non connecté
      }
      this.router.navigateByUrl('/client');
      this.authStore.user();
    }else{
      const role = this.authStore.role()
      const target = ROLE_REDIRECT[role!]
      this.router.navigateByUrl(target)
    }
  }
  login(){
    this.router.navigateByUrl('/login');
  }
  registerBoutique(){
    this.router.navigateByUrl('/registerboutique');
  }
}
