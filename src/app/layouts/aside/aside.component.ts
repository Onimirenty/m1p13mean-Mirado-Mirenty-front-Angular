import { CommonModule } from '@angular/common';
import { Component, effect, Input, input, OnInit, output } from '@angular/core';
import { Router } from '@angular/router';
import { AsideState } from '../../store/aside/aside.state';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthStore } from '../../core/store/auth.store';

export interface NavItem {
  label: string;
  class_icon: string;
  path: string;
  active:boolean;
}
@Component({
  selector: 'app-aside',
  imports: [CommonModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent implements OnInit {
  isOpen = input<boolean>(false);
  menuItems = input.required<NavItem[]>();
  @Input() theme:'dark'|'light' = 'light';
  itemClicked = output<string>();
  constructor(private authStore:AuthStore, private router: Router,private asideState:AsideState,private notificationService:NotificationService){

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

  ngOnInit(): void {
    this.itemClicked.emit(this.router.url.split('?')[0]+'');
  }

  logout(){
    this.authStore.logout();
  }

  clickMenu(path:string|null,index:number){
    if(path){
      this.router.navigateByUrl(path);
      this.asideState.toggleMenu();
      this.asideState.setIdActive(index);
      this.itemClicked.emit(path);
    }
  }
}
