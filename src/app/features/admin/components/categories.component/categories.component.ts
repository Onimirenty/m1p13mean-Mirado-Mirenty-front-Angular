import { Component, DOCUMENT, effect, Inject, Renderer2, signal } from '@angular/core';
import { CreateCategorieComponent } from "../create-categorie/create-categorie.component";


interface Categorie {
  _id: string;
  nom: string;
  iconClass: string;
}
@Component({
  selector: 'app-categories',
  imports: [CreateCategorieComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories = signal<Categorie[]>([
    { "_id": "1", "nom": "Électronique", "iconClass": "fa-solid fa-laptop" },
    { "_id": "2", "nom": "Mode & Beauté", "iconClass": "fa-solid fa-shirt" },
    { "_id": "3", "nom": "Restauration", "iconClass": "fa-solid fa-utensils" },
    { "_id": "4", "nom": "Maison", "iconClass": "fa-solid fa-house" }
  ]);
  isAddModalOpen = signal(false);

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    //surveille le signal : desactive l'overflow de l'arriere plan quand le sidebar est activé
    effect(() => {
      const open = this.isAddModalOpen();
      if (open) {
        this.renderer.addClass(this.document.body, 'overflow-hidden');
      } else {
        this.renderer.removeClass(this.document.body, 'overflow-hidden');
      }
    });
  }

  handleAdd(newCategorie: any) {
    // Ici : ton appel API POST /admin/categorie
    console.log('Nouvelle categorie :', newCategorie);
    this.isAddModalOpen.set(false);
  }
}
