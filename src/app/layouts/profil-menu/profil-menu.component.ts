import { Component, effect, Input, signal } from '@angular/core';
import { AsideState } from '../../store/aside/aside.state';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthStore } from '../../core/store/auth.store';

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
  constructor(private authStore : AuthStore,private asideState:AsideState, private router:Router, private notificationService:NotificationService){
    effect(() => {
      if (this.authStore.successLogout()) {
        this.asideState.clear();
        this.authStore.resetStatusLogout();
        this.router.navigateByUrl('/login');
      }
      if (this.authStore.errorLogout()) {
        this.notificationService.showError(this.authStore.errorLogout()!);
        this.authStore.resetStatusLogout();
      }
    })
  }

  logout(){
    this.authStore.logout();
  }
  toggleProfile() {
    this.isProfileOpen.update(v => !v);
  }

}
