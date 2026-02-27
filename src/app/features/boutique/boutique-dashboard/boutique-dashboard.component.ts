import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-boutique-dashboard',
  imports: [],
  templateUrl: './boutique-dashboard.component.html',
  styleUrl: './boutique-dashboard.component.scss',
})
export class BoutiqueDashboardComponent {
  stats = signal({ vues: 230, promoClics: 85 });

  promotions = signal([
  {
    _id: "65b3009abc5550011228899",
    titre: "Promo rentrée",
    taux: 20,
    prixInitial: 250000,
    prixReduit: 200000,
    description: "Réduction spéciale rentrée scolaire sur les articles sélectionnés.",
    imageUrl: "https://picsum.photos/600/400?random=1",
    dateDebut: "2026-02-01",
    dateFin: "2026-02-15",
    status: "VALIDEE",
    vues: 180,
    createdAt: "2026-01-28T10:00:00Z"
  },
  {
    _id: "65b3009abc5550011228801",
    titre: "Black Friday",
    taux: 40,
    prixInitial: 500000,
    prixReduit: 300000,
    description: "Offre exceptionnelle Black Friday sur toute la boutique.",
    imageUrl: "https://picsum.photos/600/400?random=2",
    dateDebut: "2026-11-25",
    dateFin: "2026-11-30",
    status: "EN_ATTENTE",
    vues: 95,
    createdAt: "2026-11-01T09:30:00Z"
  },
  {
    _id: "65b3009abc5550011228802",
    titre: "Soldes d'été",
    taux: 30,
    prixInitial: 150000,
    prixReduit: 105000,
    description: "Profitez des soldes d'été sur une large sélection de produits.",
    imageUrl: "https://picsum.photos/600/400?random=3",
    dateDebut: "2026-06-01",
    dateFin: "2026-06-30",
    status: "VALIDEE",
    vues: 420,
    createdAt: "2026-05-28T14:15:00Z"
  },
  {
    _id: "65b3009abc5550011228803",
    titre: "Déstockage spécial",
    taux: 50,
    prixInitial: 100000,
    prixReduit: 50000,
    description: "Grande opération déstockage jusqu'à épuisement du stock.",
    imageUrl: "https://picsum.photos/600/400?random=4",
    dateDebut: "2025-12-01",
    dateFin: "2025-12-10",
    status: "REFUSEE",
    vues: 60,
    createdAt: "2025-11-28T08:00:00Z"
  }
]);

  produits = signal([
    { _id: 'p1', nom: 'Laptop Dell i7', prix: 3200000, imageUrl: 'https://images.unsplash.com', description: 'Core i7 – 16GB RAM' },
    { _id: 'p2', nom: 'Souris Gamer', prix: 150000, imageUrl: 'https://images.unsplash.com', description: 'RGB 16000 DPI' },
    { _id: 'p3', nom: 'Clavier Méca', prix: 450000, imageUrl: 'https://images.unsplash.com', description: 'Switch Blue' }
  ]);

  annonces = signal([
  {
    _id: "65b4100abc1230099887766",
    title: "Ouverture exceptionnelle",
    content: "Le centre sera ouvert jusqu’à 22h ce samedi pour faciliter vos achats.",
    createdAt: "2026-02-02T14:00:00Z"
  },
  {
    _id: "65b4100abc1230099887701",
    title: "Nouvelle boutique disponible",
    content: "Une nouvelle boutique high-tech ouvre ses portes au niveau 2 dès lundi.",
    createdAt: "2026-02-05T09:00:00Z"
  },
  {
    _id: "65b4100abc1230099887702",
    title: "Maintenance programmée",
    content: "Une maintenance du système est prévue ce dimanche entre 01h et 03h.",
    createdAt: "2026-02-10T18:30:00Z"
  },
  {
    _id: "65b4100abc1230099887703",
    title: "Événement spécial Saint-Valentin",
    content: "Des animations spéciales et réductions exclusives seront proposées ce 14 février.",
    createdAt: "2026-02-12T11:15:00Z"
  }
]);

  // Fonction de scroll générique pour les carrousels
  scroll(id: string, distance: number) {
    const el = document.getElementById(id);
    if (el) el.scrollBy({ left: distance, behavior: 'smooth' });
  }
}
