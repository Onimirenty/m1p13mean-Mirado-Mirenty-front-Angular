import { Component, computed, DOCUMENT, effect, Inject, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from '../footer/footer.component';
import { AsideComponent, NavItem } from '../aside/aside.component';
import { ProfilMenuComponent } from "../profil-menu/profil-menu.component";
import { AsideState } from '../../store/aside/aside.state';

@Component({
  selector: 'app-admin-layout.component',
  imports: [RouterOutlet, FooterComponent, AsideComponent, ProfilMenuComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  //signal pour ouverture et fermeture du sidebar
  isMenuOpen = computed(() => this.asideState.isOpen());
  //menu admin pour sidebar
  adminMenu: NavItem[] = [
    { label: 'Home', class_icon: 'fas fa-chart-line', path: '/admin/home', active:false},
    { label: 'Utilisateurs', class_icon: 'fas fa-users', path: '/admin/users', active:false},
    { label: 'Infrastructure', class_icon: 'fas fa-server', path: '/admin/infra', active:true},
    { label: 'Paramètres', class_icon: 'fas fa-cog', path: '/admin/settings', active:false }
  ];
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document,private asideState: AsideState) {
      //surveille le signal : desactive l'overflow de l'arriere plan quand le sidebar est activé
      effect(() => {
        const open = this.isMenuOpen();
        if (open) {
          this.renderer.addClass(this.document.body, 'overflow-hidden');
        } else {
          this.renderer.removeClass(this.document.body, 'overflow-hidden');
        }
      });
    }
  toggleMenu() {
    this.asideState.toggleMenu();
  }
}
