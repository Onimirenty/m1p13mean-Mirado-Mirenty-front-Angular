import { Injectable } from "@angular/core";
import { MyAuthHttpClient } from '../../a-httpclient-simulation/my-auth-http-client-public';
import { environment } from "../../../environments/environement";
import { Categorie, CategorieState } from '../store/categorie.state';
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoriePublicService {
  private API_URL = environment.apiUrl+'/categories';
  constructor(private http:MyAuthHttpClient){}

  findAll() {
    return this.http.get<Categorie[]>(this.API_URL)
  }
}
