import { Component, signal } from '@angular/core';
import { CreateAnnonceComponent } from '../create-annonce/create-annonce.component';
export interface Annonce {
  _id: string;
  title: string;
  content: string;
  createdAt: string | Date;
}
@Component({
  selector: 'app-annonces',
  imports: [CreateAnnonceComponent],
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.scss',
})
export class AnnoncesComponent {
  annonces = signal<Annonce[]>([
    {
      "_id": "ann-001",
      "title": "Nocturne Exceptionnelle : Soldes d'Été",
      "content": "Ce samedi, profitez de vos boutiques préférées jusqu'à 22h00. Des animations musicales et des distributions de rafraîchissements sont prévues dans la Galerie Centrale.",
      "createdAt": "2026-02-27T10:00:00Z"
    },
    {
      "_id": "ann-002",
      "title": "Maintenance Parking Indigo (Niveau -1)",
      "content": "En raison de travaux de peinture, l'accès au niveau -1 du parking sera fermé du lundi 5 au mercredi 7 février. Merci de privilégier les niveaux supérieurs.",
      "createdAt": "2026-02-01T09:15:00Z"
    },
    {
      "_id": "ann-003",
      "title": "Recrutement : Job Dating Akoor",
      "content": "Plusieurs enseignes du centre (restauration et prêt-à-porter) recrutent pour la saison. Rendez-vous le 15 février à l'Espace Administration avec votre CV.",
      "createdAt": "2026-01-28T16:30:00Z"
    },
    {
      "_id": "ann-004",
      "title": "Nouvelle Enseigne : Bienvenue à Starbucks !",
      "content": "Nous sommes ravis d'accueillir Starbucks dans notre Food Court. Ouverture officielle ce vendredi à 08h00 avec une dégustation gratuite pour les 100 premiers clients.",
      "createdAt": "2026-01-25T10:00:00Z"
    },
    {
      "_id": "ann-005",
      "title": "Collecte de Dons : Association 'Handi-Mada'",
      "content": "Une borne de collecte de vêtements et de fournitures scolaires est disponible à l'accueil du centre tout au long du mois de février. Merci pour votre générosité.",
      "createdAt": "2026-01-20T11:45:00Z"
    }
  ]);
  // Signal pour contrôler la modal
  isPublishModalOpen = signal(false);

  handlePublish(payload: { title: string; content: string }) {
    // Ici : Appel service vers ton API POST /admin/annonces
    const newAnnonce = {
      ...payload,
      _id: Math.random().toString(36), // Simulation ID
      createdAt: new Date().toISOString()
    };

    this.annonces.update(list => [newAnnonce, ...list]);
    this.isPublishModalOpen.set(false);
  }

  isRecent(date: string | Date): boolean {
    const postDate = new Date(date).getTime();
    const now = new Date().getTime();
    const diffInHours = (now - postDate) / (1000 * 60 * 60);
    return diffInHours < 46; // Considéré comme nouveau si moins de 24h
  }


}
