import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { LoginComponent } from './login/login.component';
import { permisosGuard } from './permisos.guard';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent, canActivate: [permisosGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [permisosGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'detail/:id', component: HeroDetailComponent, canActivate: [permisosGuard]},
  { path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
