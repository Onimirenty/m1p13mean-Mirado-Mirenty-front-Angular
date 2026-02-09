import { computed, Injectable, signal} from '@angular/core'
import { ZonePublicService } from '../services/zone-public.service';
import { tap } from 'rxjs';

export interface Zone {
  _id:string;
  etage:string,
  bloc:string,
  box:string,
  status:string,
  description:string,
}

@Injectable({ providedIn: 'root' })
export class ZoneState {

  private _zones = signal<Zone[]>([]);

  zones = this._zones.asReadonly()
  //readonly zones = computed(() => this._zones());
  constructor(private zonePublicService : ZonePublicService){}

  getAll() {
    return this.zonePublicService.findAll().pipe(
      tap(data => this._zones.set(data))
    );
  }


}

