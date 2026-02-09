import { Injectable, signal, computed } from '@angular/core'
import { AuthUser } from '../auth.model'
import { AuthService } from '../auth.service'
import { catchError, firstValueFrom, of, tap } from 'rxjs'

export interface UserRegister{
  nom:string,
  genre:number,
  dateNaissance:string,
  email:string,
  password:string
}

@Injectable({ providedIn: 'root' })
export class AuthStore {

  private _user = signal<AuthUser | null>(null)

  user = this._user.asReadonly()

  isAuthenticated = computed(() => !!this._user()) //valeur derive de _user

  role = computed(() => this._user()?.role ?? null) //valeur derive de _user.role ou null
  //===============================================login
  private _loadingLogin = signal<boolean>(false);
  private _errorLogin = signal<string|null>(null);
  private _successLogin = signal<boolean>(false);

  readonly loadingLogin = computed(() => this._loadingLogin());
  readonly errorLogin = computed(() => this._errorLogin());
  readonly successLogin = computed(() => this._successLogin());
  //===============================================Logout
  private _loadingLogout = signal<boolean>(false);
  private _errorLogout = signal<string|null>(null);
  private _successLogout = signal<boolean>(false);

  readonly loadingLogout = computed(() => this._loadingLogout());
  readonly errorLogout = computed(() => this._errorLogout());
  readonly successLogout = computed(() => this._successLogout());

  // ===============================================registre
  private _loadingRgst = signal<boolean>(false);
  private _errorRgst = signal<string|null>(null);
  private _successRgst = signal<boolean>(false);

  readonly loadingRgst = computed(() => this._loadingRgst());
  readonly errorRgst = computed(() => this._errorRgst());
  readonly successRgst = computed(() => this._successRgst());


  constructor(private authService:AuthService){}

  setUser(user: AuthUser) {
    this._user.set(user)
  }

  clear() {
    this._user.set(null)
  }

  login(email: string, password: string){
    this._loadingRgst.set(true);
    this.authService.login(email,password).subscribe({
      next : (res) => {
        localStorage.setItem('token', res.token)
        this.setUser({ email:res.email,role:res.role })
        this._loadingRgst.set(false)
        this._successLogin.set(true)
      },
      error : (error) => {
        console.log(error);
        this._loadingLogin.set(false);
        if ([400, 404, 409].includes(error?.status)) {
          this._errorLogin.set(error?.message);
        } else if(![401, 403].includes(error?.status)) {
          this._errorLogin.set( "Erreur inattendue. Veuillez réessayer plus tard.");
        }
      }
    });
  }
  logout(){
    this._loadingRgst.set(true);
    this.authService.logout().subscribe({
      next : (res) => {
        this._loadingRgst.set(false)
        this._successLogout.set(true)
        this.clear();
        this.authService.clearToken();
      },
      error : (error) => {
        console.log(error);
        this._loadingLogout.set(false);
        if ([400, 404, 409].includes(error?.status)) {
          this._errorLogout.set(error?.message);
        }else if(![401, 403].includes(error?.status)) {
          this._errorLogout.set( "Erreur inattendue. Veuillez réessayer plus tard.");
        }
      }
    });
  }

  async restoreUserSession(): Promise<void> {
    if(!this.authService.token){
      this.setUser({ email: '', role: 'VISITOR' });
      return Promise.resolve();
    }
    return firstValueFrom(
      this.authService.restoreUserSession().pipe(
          tap(res => { this.setUser({ email: res.email, role: res.role }); }),
          catchError(() => {
            this.authService.clearToken();
            return of(null);
          })
        )
      ).then(() => undefined);
  }

  register(userRegister:UserRegister){
    if (this.loadingRgst()) {
      return;
    }
    this._loadingRgst.set(true);
    this.authService.registerUser(userRegister).subscribe({
      next : (res) => {
        localStorage.setItem('token', res.token)
        this.setUser({ email:res.email,role:res.role })
        this._loadingRgst.set(false);
        this._successRgst.set(true);
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

  resetStatusRgst() {
    this._errorRgst.set(null);
    this._successRgst.set(false);
  }
  resetStatusLogin() {
    this._errorLogin.set(null);
    this._successLogin.set(false);
  }
  resetStatusLogout() {
    this._errorLogout.set(null);
    this._successLogout.set(false);
  }
}

// .pipe(
//       tap(res => {
//         localStorage.setItem('token', res.token)
//         this.authState.setUser({ email:res.email,role:res.role })
//       }),
//       catchError((error) => {
//         console.log(error);
//         return throwError(() => error);
//       })
