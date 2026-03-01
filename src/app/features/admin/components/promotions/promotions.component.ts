import { Component, computed, effect, signal, OnInit } from '@angular/core';
import { AdminStore } from '../../store/admin.store';
import { NotificationService } from '../../../../shared/services/notification.service';

export interface Promotion {
  _id: string;
  titre: string;
  taux: number;          // Ex: 20 pour 20%
  prixInitial: number|null;   // Ex: 250000
  prixReduit: number|null;    // Ex: 200000
  description: string;
  imageUrl: string;
  dateDebut: string | Date;
  dateFin: string | Date;
  status: string;
  vues: number;
  createdAt: string | Date;
  // Optionnel : lier la promo à sa boutique si besoin plus tard
  boutiqueId?: string;
}
@Component({
  selector: 'app-promotions',
  imports: [],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent implements OnInit{
  promotions = computed(()=> this.adminStore.promotions());
  loadingPromotions = computed(()=> this.adminStore.loadingPromotions());
//   signal<Promotion[]>([
//   {
//     "_id": "p1",
//     "titre": "Back to School Tech",
//     "taux": 15,
//     "prixInitial": 0,
//     "prixReduit": 2975000,
//     "description": "Réduction exceptionnelle sur les MacBook Air M2 pour les étudiants.",
//     "imageUrl": "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/back-to-school-special-promo-design-template-0529561ce6acbd2b5a1911bc212f3a76_screen.jpg?ts=1720525558",
//     "dateDebut": "2026-02-01",
//     "dateFin": "2026-02-28",
//     "status": "EN_ATTENTE",
//     "vues": 450,
//     "createdAt": "2026-01-25T08:30:00Z"
//   },
//   {
//     "_id": "p2",
//     "titre": "Summer Collection",
//     "taux": 40,
//     "prixInitial": 150000,
//     "prixReduit": 90000,
//     "description": "Liquidation totale sur la collection été avant l'arrivée des nouveautés.",
//     "imageUrl": "https://img.freepik.com/premium-photo/trendy-summer-collection-promotion-vibrant-fashion-chic-accessories-social-media_416256-128446.jpg?w=360",
//     "dateDebut": "2026-01-15",
//     "dateFin": "2026-02-10",
//     "status": "VALIDEE",
//     "vues": 1280,
//     "createdAt": "2026-01-10T14:20:00Z"
//   },
//   {
//     "_id": "p3",
//     "titre": "Menu Duo Gourmand",
//     "taux": 25,
//     "prixInitial": null,
//     "prixReduit": null,
//     "description": "Un burger acheté, le deuxième à moitié prix tous les mardis soirs.",
//     "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeATtCOX3KFgzfWWbG0eDkAWOlqyZy0vD3Hg&s",
//     "dateDebut": "2026-02-01",
//     "dateFin": "2026-03-31",
//     "status": "VALIDEE",
//     "vues": 890,
//     "createdAt": "2026-01-28T11:00:00Z"
//   },
//   {
//     "_id": "p4",
//     "titre": "Flash Sale Déco",
//     "taux": 50,
//     "prixInitial": 450000,
//     "prixReduit": 225000,
//     "description": "Vente flash sur les luminaires et vases design pendant 48h seulement.",
//     "imageUrl": "https://img.freepik.com/vecteurs-libre/offre-vente-instantanee-limitee-fins-promotion-publicite-commerciale_1017-55840.jpg?semt=ais_hybrid&w=740&q=80",
//     "dateDebut": "2026-02-05",
//     "dateFin": "2026-02-07",
//     "status": "REFUSEE",
//     "vues": 0,
//     "createdAt": "2026-02-01T09:15:00Z"
//   },
//   {
//     "_id": "p5",
//     "titre": "Espace Gaming",
//     "taux": 10,
//     "prixInitial": 1200000,
//     "prixReduit": 1080000,
//     "description": "Pack PS5 + 2 manettes DualSense à prix réduit.",
//     "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaj1F8uj6ITYTordDtR5_jk5bA8XrAvMNc6g&s",
//     "dateDebut": "2026-02-10",
//     "dateFin": "2026-02-20",
//     "status": "EN_ATTENTE",
//     "vues": 120,
//     "createdAt": "2026-02-02T16:45:00Z"
//   }
// ]);

  pendingCount = computed(() => {
    const promos = this.promotions() || []; // Sécurité si le signal est null/undefined au départ
    return promos.filter(p => p.status === 'EN_ATTENTE').length;
  });

  constructor(private adminStore:AdminStore,private notificationService: NotificationService){
    effect(() => {
      if(this.adminStore.errorActionPromo()){
        const lastId=this.adminStore?.lastIdInErrorActionPromo()()?.id;
        if(lastId){
          this.notificationService.showError(this.adminStore.errorActionPromoById(lastId)()!);
          this.adminStore.resetStatusActionPromo(lastId);
        }
      }
    });
  }
  ngOnInit(): void {
    this.adminStore.promotionsCenter(null);
  }

  updateStatus(id: string, newStatus: 'VALIDEE' | 'REFUSEE') {
    this.adminStore.updatePromotionStatus(id,newStatus);
  }
}
