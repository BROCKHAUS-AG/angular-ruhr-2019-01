import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MapComponent } from './map/map.component';
import { HometownComponent } from './hometown/hometown.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'hometown',
        component: HometownComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
