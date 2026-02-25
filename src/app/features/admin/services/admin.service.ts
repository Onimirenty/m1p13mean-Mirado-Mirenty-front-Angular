import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environement";

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private API_URL = environment.apiUrl+'/admin';

}
