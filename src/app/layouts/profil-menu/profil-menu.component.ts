import { Component, Input, signal } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-profil-menu',
  imports: [],
  templateUrl: './profil-menu.component.html',
  styleUrl: './profil-menu.component.scss',
})
export class ProfilMenuComponent {
  @Input() urlImageProfil:string|null = null;
  @Input() pathProfil:string = "#";
  isProfileOpen = signal(false);
  constructor(private authService:AuthService){}
  toggleProfile() {
    this.isProfileOpen.update(v => !v);
  }
  logout(){
    this.authService.logout();
  }
}
