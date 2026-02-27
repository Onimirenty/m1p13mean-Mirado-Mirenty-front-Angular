import { Component, computed, DOCUMENT, effect, Inject, Renderer2, signal } from '@angular/core';
import { CreateZoneComponent } from '../create-zone/create-zone.component';


interface Zone {
  _id: string;
  etage: string;
  bloc: string;
  box: string;
  description: string;
}
@Component({
  selector: 'app-zones',
  imports: [CreateZoneComponent],
  templateUrl: './zones.components.html',
  styleUrl: './zones.components.scss',
})
export class ZonesComponents {
  isAddModalOpen = signal(false);
  zones = signal<Zone[]>([
    {
      "_id": "z1",
      "etage": "RDC",
      "bloc": "Aile Nord",
      "box": "A-01",
      "description": "Emplacement premium face à l'entrée principale, flux élevé."
    },
    {
      "_id": "z2",
      "etage": "RDC",
      "bloc": "Galerie Centrale",
      "box": "C-12",
      "description": "Zone de services et distributeurs automatiques."
    },
    {
      "_id": "z3",
      "etage": "1er Étage",
      "bloc": "Food Court",
      "box": "F-05",
      "description": "Espace dédié à la restauration rapide avec terrasse."
    },
    {
      "_id": "z4",
      "etage": "1er Étage",
      "bloc": "Aile Sud",
      "box": "S-22",
      "description": "Boutiques de mode et prêt-à-porter de luxe."
    },
    {
      "_id": "z5",
      "etage": "2ème Étage",
      "bloc": "Zone Loisirs",
      "box": "L-08",
      "description": "Proche du cinéma et de l'espace de jeux pour enfants."
    },
    {
      "_id": "z6",
      "etage": "Sous-sol",
      "bloc": "Parking P1",
      "box": "P-02",
      "description": "Kiosque de lavage auto et services rapides."
    }
  ]);
  searchQuery = signal('');


  // Filtrage intelligent
  filteredZones = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    return this.zones().filter(z =>
      z.etage.toLowerCase().includes(query) || z.bloc.toLowerCase().includes(query) || z.box.toLowerCase().includes(query)
    );
  });

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

  handleAddZone(newZone: any) {
    // Ici : ton appel API POST /admin/zone
    console.log('Nouvelle zone :', newZone);
    this.isAddModalOpen.set(false);
  }


}
