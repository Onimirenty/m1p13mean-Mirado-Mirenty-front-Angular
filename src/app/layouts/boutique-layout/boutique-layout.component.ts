import { Component, computed, DOCUMENT, effect, Inject, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from '../footer/footer.component';
import { NavItem, AsideComponent } from '../aside/aside.component';
import { ProfilMenuComponent } from "../profil-menu/profil-menu.component";
import { AsideState } from '../../store/aside/aside.state';

@Component({
  selector: 'app-boutique-layout.component',
  imports: [RouterOutlet, FooterComponent, AsideComponent, ProfilMenuComponent],
  templateUrl: './boutique-layout.component.html',
  styleUrl: './boutique-layout.component.scss',
})
export class BoutiqueLayoutComponent {
  //signal pour ouverture et fermeture du sidebar
  isMenuOpen = computed(() => this.asideState.isOpen());
  //menu admin pour sidebar
  menus = signal<NavItem[]> ( [
    { label: 'Espace boutique', class_icon: 'fa-solid fa-home', path: '/boutique/home', active:false},
    { label: 'Profil', class_icon: 'fa-solid fa-store', path: '/boutique/profil', active:false},
  ]);
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
  activateIndex(path:string) {
    this.menus.update(items =>
      items.map((item, i) => ({
        ...item,
        active: item.path === path
      }))
    );
  }

}
