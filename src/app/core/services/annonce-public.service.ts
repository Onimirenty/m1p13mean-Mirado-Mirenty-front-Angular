import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environement";
import { Observable } from "rxjs";
import { AdminHttpClient } from "../../a-httpclient-simulation/admin-http-client";

export interface Annonce {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AnnoncePublicService {
  private API_URL = environment.apiUrl + '/annonces';

  constructor(private http: AdminHttpClient) {}

  /**
   * 11. Liste des annonces (Public / Admin / Boutique / Client)
   */
  findAll(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.API_URL);
  }
}
