import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environement';
import { AdminHttpClient } from '../../../a-httpclient-simulation/admin-http-client';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { DashboardStats } from '../components/dashboard/dashboard-admin/dashboard-admin.component';

@Injectable({
  providedIn: 'root',
})
export class StatisticsAdminService {
  private API_URL = environment.apiUrl+'/stats/center';

  constructor(private http:AdminHttpClient){}

  statistics(day:number):Observable<DashboardStats>{
    let d=7;
    if(day) d=day;
    let params = new HttpParams();
    params=params.set('period',`${d}d`);
    return this.http.get<DashboardStats>(`${this.API_URL}`,params);
  }
}
