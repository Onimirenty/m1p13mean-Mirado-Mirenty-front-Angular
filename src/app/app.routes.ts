import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './features/admin/admin-home/admin-home.component';
import { BoutiqueHomeComponent } from './features/boutique/boutique-home/boutique-home.component';
import { ClientHomeComponent } from './features/client/client-home/client-home.component';
import { AuthGuard } from './core/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { BoutiqueLayoutComponent } from './layouts/boutique-layout/boutique-layout.component';

export const routes: Routes =  [
  { path: 'login', component: LoginComponent },
  //ADMIN
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], data: { role: 'admin' },
    children:[
      {path:'',component:AdminHomeComponent},
      {path:'home',component:AdminHomeComponent}
    ]
  },
  //BOUTIQUE
  { path: 'boutique', component: BoutiqueLayoutComponent, canActivate: [AuthGuard], data: { role: 'boutique' },
    children:[
      {path:'',component:BoutiqueHomeComponent},
      {path:'home',component:BoutiqueHomeComponent}
    ]
  },
  //CLIENT
  { path: 'client', component: ClientLayoutComponent, canActivate: [AuthGuard], data: { role: 'client' },
    children:[
      {path:'',component:ClientHomeComponent},
      {path:'home',component:ClientHomeComponent}
    ]
  },
  //
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
