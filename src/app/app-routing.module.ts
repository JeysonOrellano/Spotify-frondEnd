import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/page/home-page/home-page.component';
import { SessionGuard } from '@core/guards/session.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("../app/modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: '',
    component:HomePageComponent,
    loadChildren: () => import("../app/modules/home/home.module").then(m => m.HomeModule),
    canActivate:[SessionGuard]
  },
 /*  {
    path:'tracks',
    loadChildren: () => import("../app/modules/tracks/tracks.module").then(m => m.TracksModule)
  } */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
