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

  get<T>(url: string, param?: any, header?: any): Observable<T> {

    // 🔐 Vérification du token Bearer
    // const authHeader = header?.Authorization || header?.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return throwError(() => ({
    //     status: 401,
    //     message: 'Token manquant ou invalide'
    //   })).pipe(delay(500));
    // }

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

    // ======================================================================= AUTRES GET non simulés
    return throwError(() => ({
      status: 404,
      message: `GET ${url} non simulé`
    }));
  }
}
