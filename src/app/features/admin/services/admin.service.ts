import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environement";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { AdminHttpClient } from "../../../a-httpclient-simulation/admin-http-client";

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  private API_URL = environment.apiUrl + '/admin';

  constructor(private http: AdminHttpClient) {}

  // ======================================================
  // CENTRE
  // ======================================================

  getCenterProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/center`);
  }

  updateCenter(data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/center`, data);
  }

  // ======================================================
  // ZONES
  // ======================================================

  createZone(payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/zones`, payload);
  }

  getZones(): Observable<any[]> {
    return this.http.get(`${this.API_URL}/zones`);
  }

  // ======================================================
  // CATÉGORIES
  // ======================================================

  createCategory(payload: any): Observable<any> {
    return this.http.post(`${this.API_URL}/categories`, payload);
  }

  getCategories(): Observable<any[]> {
    return this.http.get(`${this.API_URL}/categories`);
  }

  // ======================================================
  // BOUTIQUES EN ATTENTE
  // ======================================================

  getPendingBoutiques(): Observable<any[]> {
    const params = new HttpParams().set('status', 'EN_ATTENTE');
    return this.http.get(`${this.API_URL}/boutiques`, params);
  }

  // ======================================================
  // ✅ VALIDATION & STATUS
  // ======================================================

  validateBoutique(id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/boutiques/${id}/validate`);
  }

  activateBoutique(id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/boutiques/${id}/activate`);
  }

  disableBoutique(id: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/boutiques/${id}/disable`);
  }

}
