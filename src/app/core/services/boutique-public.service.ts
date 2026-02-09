import { Injectable } from "@angular/core";
import { MyAuthHttpClient } from '../../a-httpclient-simulation/my-auth-http-client-public';
import { environment } from "../../../environments/environement";
import { BoutiqueRegister } from "../store/boutique-public.store";
import { NO_AUTH } from "../interceptors/tokens";
import { HttpContext } from "@angular/common/http";



@Injectable({ providedIn: 'root' })
export class BoutiquePublicService {

}
