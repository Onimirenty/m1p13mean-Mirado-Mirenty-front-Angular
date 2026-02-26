import { Injectable } from "@angular/core";
import { environment } from "../../environments/environement";
import { Observable, of, throwError } from "rxjs";
import { delay } from "rxjs/operators";

export interface StatsResponse {
  nbBoutiqueActive: number;
  nbPromotionEnCours: number;
  nbUserClient: number;
  topBoutique: { _id: string; nom: string }[];
  visitors: {
    type: 'daily' | 'weekly';
    from: string;
    to: string;
    data: { date: string; count: number }[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class AdminHttpClient {

  private API_URL = environment.apiUrl;

  // ============================= DONNÉES MOCK EN MÉMOIRE

  private center = {
    nom: "Centre Commercial Akoor",
    description: "Le plus grand centre commercial de la ville",
    horaires: { jours: "Tous les jours", heures: "08h00 - 20h00" },
    contact: "+261 32 45 678 90",
    email: "contact@akoor.com",
    planImageUrl: "https://cdn.app/center/plan.png"
  };

  private zones: any[] = [
    {
      _id: "65a2b123abc4560011223344",
      etage: "RDC",
      bloc: "Bloc A",
      box: "A12",
      description: "Zone principale proche entrée"
    }
  ];

  private categories: any[] = [
    {
      _id: "65a2c987abc4560099887766",
      nom: "Électronique",
      iconClass: "fa-solid fa-laptop"
    }
  ];

  private boutiques: any[] = [
    {
      _id: "65a3d001abc9990011223344",
      email: "techstore@gmail.com",
      nom: "Tech Store",
      logoUrl: "https://cdn.app/boutiques/techstore.png",
      categorie: {
        _id: "65a2c987abc4560099887766",
        nom: "Électronique"
      },
      horaires: { jours: "Tous les jours", heures: "08h00 - 20h00" },
      contact: "+261 34 12 345 67",
      status: "EN_ATTENTE"
    }
  ];

  // ======================================================
  // ========================== GET ========================
  // ======================================================

  get<T>(url: string, param?: any, header?: any): Observable<T> {
// ======================================================================= STATS SUR 7 JOURS
    if (url === `${this.API_URL}/stats/center` && param.get('period') === '7d') {
      const response: StatsResponse = {
        nbBoutiqueActive: 25,
        nbPromotionEnCours: 12,
        nbUserClient: 340,
        topBoutique: [
          { _id: 'b1', nom: 'Shop Fashion' },
          { _id: 'b2', nom: 'Tech Store' }
        ],
        visitors: {
          type: 'daily',
          from: '2026-01-29',
          to: '2026-02-04',
          data: [
            { date: '2026-01-29', count: 120 },
            { date: '2026-01-30', count: 135 },
            { date: '2026-01-31', count: 98 },
            { date: '2026-02-01', count: 150 },
            { date: '2026-02-02', count: 170 },
            { date: '2026-02-03', count: 200 },
            { date: '2026-02-04', count: 180 }
          ]
        }
      };
      return of(response as unknown as T).pipe(delay(700));
    }
    // 3️⃣ Profil centre
    if (url === `${this.API_URL}/admin/center`) {
      return of(this.center as unknown as T).pipe(delay(600));
    }

    // 6️⃣ Liste zones
    if (url === `${this.API_URL}/admin/zones`) {
      return of(this.zones as unknown as T).pipe(delay(600));
    }

    // 8️⃣ Liste catégories
    if (url === `${this.API_URL}/admin/categories`) {
      return of(this.categories as unknown as T).pipe(delay(600));
    }

    // 9️⃣ Boutiques en attente
    if (url === `${this.API_URL}/admin/boutiques` && param?.get('status') === 'EN_ATTENTE') {
      const result = this.boutiques.filter(b => b.status === 'EN_ATTENTE');
      return of(result as unknown as T).pipe(delay(700));
    }

    return throwError(() => ({
      status: 404,
      message: `GET ${url} non simulé`
    }));
  }

  // ======================================================
  // ========================== POST =======================
  // ======================================================

  post<T>(url: string, body: any, header?: any): Observable<T> {

    // 5️⃣ Créer zone
    if (url === `${this.API_URL}/admin/zones`) {

      const newZone = {
        _id: Date.now().toString(),
        ...body
      };

      this.zones.push(newZone);

      return of(newZone as unknown as T).pipe(delay(700));
    }

    // 7️⃣ Créer catégorie
    if (url === `${this.API_URL}/admin/categories`) {

      const newCategory = {
        _id: Date.now().toString(),
        ...body
      };

      this.categories.push(newCategory);

      return of(newCategory as unknown as T).pipe(delay(700));
    }

    return throwError(() => ({
      status: 404,
      message: `POST ${url} non simulé`
    }));
  }

  // ======================================================
  // ========================== PUT ========================
  // ======================================================

  put<T>(url: string, body: any, header?: any): Observable<T> {

    // 4️⃣ Mise à jour centre
    if (url === `${this.API_URL}/admin/center`) {

      this.center = {
        ...this.center,
        ...body,
        planImageUrl: body?.image
          ? "https://cdn.app/center/plan-centre.png"
          : this.center.planImageUrl
      };

      return of(this.center as unknown as T).pipe(delay(800));
    }

    return throwError(() => ({
      status: 404,
      message: `PUT ${url} non simulé`
    }));
  }

  // ======================================================
  // ========================== PATCH ======================
  // ======================================================

  patch<T>(url: string, body?: any, header?: any): Observable<T> {

    // 10️⃣ Valider boutique
    if (url.includes('/validate')) {

      const id = url.split('/')[url.split('/').length - 2];
      const boutique = this.boutiques.find(b => b._id === id);

      if (boutique) {
        boutique.status = "ACTIVE";
        return of({
          _id: boutique._id,
          nom: boutique.nom,
          status: boutique.status
        } as unknown as T).pipe(delay(600));
      }
    }

    // Activer boutique
    if (url.includes('/activate')) {

      const id = url.split('/')[url.split('/').length - 2];
      const boutique = this.boutiques.find(b => b._id === id);

      if (boutique) {
        boutique.status = "ACTIVE";
        return of({
          _id: boutique._id,
          nom: boutique.nom,
          status: boutique.status
        } as unknown as T).pipe(delay(600));
      }
    }

    // Désactiver boutique
    if (url.includes('/disable')) {

      const id = url.split('/')[url.split('/').length - 2];
      const boutique = this.boutiques.find(b => b._id === id);

      if (boutique) {
        boutique.status = "DISABLED";
        return of({
          _id: boutique._id,
          nom: boutique.nom,
          status: boutique.status
        } as unknown as T).pipe(delay(600));
      }
    }

    return throwError(() => ({
      status: 404,
      message: `PATCH ${url} non simulé`
    }));
  }

}
