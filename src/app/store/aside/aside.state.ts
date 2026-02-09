import { Injectable, signal} from '@angular/core'

@Injectable({ providedIn: 'root' })
export class AsideState {

  private _isOpen = signal<boolean>(false);

  isOpen = this._isOpen.asReadonly()

  //valeur derive de _user.role ou null
  toggleMenu() {
    this._isOpen.update(value => !value);
  }
  clear(){
    this._isOpen.set(false);
  }
}

