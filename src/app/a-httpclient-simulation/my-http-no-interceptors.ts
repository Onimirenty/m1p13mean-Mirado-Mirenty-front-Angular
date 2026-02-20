import { Injectable } from "@angular/core";
import { environment } from "../../environments/environement";
import { delay, Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MyHttpNoInterceptors {
  private API_URL = environment.apiUrl
  post<T>(url:string,body:any,header:any): Observable<T> {
      // ===================================================================================================LOGIN
      if (url === `${this.API_URL}/auth/logout`) {
          const response: any = {
            message: 'deconnexion reussie'
          };
          return of(response as unknown as T).pipe(delay(800));
      }

      // ========================== AUTRES POST (simuler ici plus tard)
      return throwError(() => ({
        status: 404,
        message: `POST ${url} non simulé`
      }));

  }


}
