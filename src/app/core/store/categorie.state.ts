import { computed, Injectable, signal} from '@angular/core'
import { CategoriePublicService } from '../services/categorie-public.service';
import { tap } from 'rxjs';

export interface Categorie {
  _id:string;
  nom:string;
  iconClass:string;
}

@Injectable({ providedIn: 'root' })
export class CategorieState {

  private _categories = signal<Categorie[]>([]);

  categories = this._categories.asReadonly()
  //readonly categories = computed(() => this._categories());
  constructor(private categoriePublicService : CategoriePublicService){}

  getAll() {
    return this.categoriePublicService.findAll().pipe(
      tap(data => this._categories.set(data))
    );
  }



}

