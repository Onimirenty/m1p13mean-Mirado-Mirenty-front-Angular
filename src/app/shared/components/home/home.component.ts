import { Component, signal } from '@angular/core';
import { FooterComponent } from "../../../layouts/footer/footer.component";
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../core/store/auth.store';

@Component({
  selector: 'app-home',
  imports: [FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isMenuOpen = signal(false);
  constructor(private authStore:AuthStore,private router:Router){}

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
  decouvrir(){
    this.authStore.setUser({ email:'',role:'VISITOR' });
    this.router.navigateByUrl('/client');
  }
  login(){
    this.router.navigateByUrl('/login');
  }
  registerBoutique(){
    this.router.navigateByUrl('/registerboutique');
  }
}
