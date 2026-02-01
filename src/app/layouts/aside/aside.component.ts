import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

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
export class AsideComponent {
  isOpen = input<boolean>(false);
  menuItems = input.required<NavItem[]>();
  constructor(private authService: AuthService, private router: Router){}

  logout(){
    this.authService.logout();
  }
}
