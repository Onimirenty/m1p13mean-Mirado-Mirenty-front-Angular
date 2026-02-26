import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminHomeComponent } from './features/admin/components/admin-home/admin-home.component';
import { BoutiqueHomeComponent } from './features/boutique/boutique-home/boutique-home.component';
import { ClientHomeComponent } from './features/client/client-home/client-home.component';
import { AuthGuard } from './core/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { BoutiqueLayoutComponent } from './layouts/boutique-layout/boutique-layout.component';
import { HomeComponent } from './shared/components/home/home.component';
import { RegisterBoutiqueComponent } from './shared/components/register-boutique.component/register-boutique.component';
import { RegisterUserComponent } from './shared/components/register-user.component/register-user.component';
import { DashboardAdminComponent } from './features/admin/components/dashboard-admin/dashboard-admin.component';
import { CenterProfilComponent } from './features/admin/components/center-profil/center-profil.component';
import { ZonesComponents } from './features/admin/components/zones/zones.components';
import { CategoriesComponent } from './features/admin/components/categories.component/categories.component';
import { BoutiquesComponents } from './features/admin/components/boutiques/boutiques.components';

export const routes: Routes =  [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registerboutique', component: RegisterBoutiqueComponent },
  { path: 'registeruser', component: RegisterUserComponent },
  //ADMIN
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] },
    children:[
      {path:'',component:CenterProfilComponent},
      {path:'center',component:CenterProfilComponent},
      {path:'dashboard',component:DashboardAdminComponent},
      {path:'zones',component:ZonesComponents},
      {path:'categories',component:CategoriesComponent},
      {path:'boutiques',component:BoutiquesComponents}
    ]
  },
  //BOUTIQUE
  { path: 'boutique', component: BoutiqueLayoutComponent, canActivate: [AuthGuard], data: { roles: ['BOUTIQUE'] },
    children:[
      {path:'',component:BoutiqueHomeComponent},
      {path:'home',component:BoutiqueHomeComponent}
    ]
  },
  //CLIENT
  { path: 'client', component: ClientLayoutComponent, canActivate: [AuthGuard], data: { roles: ['CLIENT','VISITOR'] },
    children:[
      {path:'',component:ClientHomeComponent},
      {path:'home',component:ClientHomeComponent}
    ]
  },
  //
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
