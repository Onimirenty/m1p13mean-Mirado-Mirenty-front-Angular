import { Component, DOCUMENT, effect, Inject, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from '../footer/footer.component';
import { NavItem, AsideComponent } from '../aside/aside.component';
import { ProfilMenuComponent } from "../profil-menu/profil-menu.component";

@Component({
  selector: 'app-client-layout.component',
  imports: [RouterOutlet, FooterComponent, AsideComponent, ProfilMenuComponent],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.scss',
})
export class ClientLayoutComponent {
  //signal pour ouverture et fermeture du sidebar
  isMenuOpen = signal(false);
  //menu admin pour sidebar
  adminMenu: NavItem[] = [
    { label: 'Tableau de bord', class_icon: 'fas fa-chart-line', path: '/admin/dashboard', active:false},
    { label: 'Utilisateurs', class_icon: 'fas fa-users', path: '/admin/users', active:false},
    { label: 'Infrastructure', class_icon: 'fas fa-server', path: '/admin/infra', active:true},
    { label: 'Tableau de bord', class_icon: 'fas fa-chart-line', path: '/admin/dashboard', active:false},
    { label: 'Utilisateurs', class_icon: 'fas fa-users', path: '/admin/users', active:false}
  ];
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
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
    this.isMenuOpen.update(value => !value);
  }
}
