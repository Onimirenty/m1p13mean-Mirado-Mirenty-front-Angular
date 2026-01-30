import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './features/admin/admin-home/admin-home.component';
import { BoutiqueHomeComponent } from './features/boutique/boutique-home/boutique-home.component';
import { ClientHomeComponent } from './features/client/client-home/client-home.component';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes =  [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'boutique', component: BoutiqueHomeComponent, canActivate: [AuthGuard], data: { role: 'boutique' } },
  { path: 'client', component: ClientHomeComponent, canActivate: [AuthGuard], data: { role: 'client' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
