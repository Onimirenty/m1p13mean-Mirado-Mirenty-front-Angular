import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { MyAuthHttpClient } from "../../a-httpclient-simulation/my-auth-http-client-public";
import { environment } from "../../../environments/environement";
import { Zone} from "../store/zone.state";

@Injectable({ providedIn: 'root' })
export class ZonePublicService {
  private API_URL = environment.apiUrl+'/zones';
  constructor(private http:MyAuthHttpClient){}

  findAll() {
    let params = new HttpParams();
    params=params.set('status','LIBRE');
    return this.http.get<Zone[]>(this.API_URL,params);
  }
}
