import { computed, Injectable, signal } from "@angular/core";
import { AuthService } from "../auth.service";
export interface Horaires {
  jours:  string;
  heures: string;
}
export interface BoutiqueRegister {
  email:           string;
  password:        string;
  nom:             string;
  categorieId:     string;
  zoneId:          string;
  horaires:        Horaires;
  contactBoutique: string;
  contactProprio:  string;
  description:  string|null|undefined;
}
@Injectable({ providedIn: 'root' })
export class BoutiqueStore {
  private _loadingRgst = signal<boolean>(false);
  private _errorRgst = signal<string|null>(null);
  private _successRgst = signal<boolean>(false);

  readonly loadingRgst = computed(() => this._loadingRgst());
  readonly errorRgst = computed(() => this._errorRgst());
  readonly successRgst = computed(() => this._successRgst());

  constructor(private authService:AuthService){}
  register(boutiqueRegister:BoutiqueRegister,file:File|null){
    if (this.loadingRgst()) {
      return;
    }
    this._loadingRgst.set(true);
    this.authService.registerBoutique(boutiqueRegister,file).subscribe({
      next : () => {
        this._loadingRgst.set(false);
        this._successRgst.set(true);
        //this.notificationService.showSuccess("Merci pour votre inscription ! Elle sera effective après validation par notre équipe",3000);
      },
      error : (error) =>{
        this._loadingRgst.set(false);
        if ([400, 404, 409].includes(error?.status)) {
          this._errorRgst.set(error?.message);
        } else if(![401, 403].includes(error?.status)) {
          this._errorRgst.set( "Erreur inattendue. Veuillez réessayer plus tard.");
        }
      }
    })
  }
  resetStatus() {
    this._errorRgst.set(null);
    this._successRgst.set(false);
  }
  // private _boutiques = signal<Boutique[]>([]);
  // readonly boutiques = computed(() => this._boutiques());

  // constructor(private http: HttpClient) {}

  // load() {
  //   this.http.get<Boutique[]>('/api/boutiques')
  //     .subscribe(res => this._boutiques.set(res));
  // }

  // add(cat: Boutique) {
  //   this.http.post<BoutiqueStoreoutique>('/api/boutiques', cat)
  //     .subscribe(res => this._boutiques.update(list => [...list, res]));
  // }

  // delete(id: string) {
  //   this.http.delete(`/api/boutiques/${id}`)
  //     .subscribe(() =>
  //       this._boutiques.update(list => list.filter(c => c.id !== id))
  //     );
  // }
}
