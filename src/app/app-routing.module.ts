import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { InicioSesionComponent } from './modules/autentificacion/pages/inicio-sesion/inicio-sesion.component';


const routes: Routes = [
  //ruta comun -> para que lleve al login

  { path: '', component: InicioSesionComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },

  {
    path: '',
    loadChildren: () =>
      import('./modules/configuracion/configuracion.module').then(
        (m) => m.ConfiguracionModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/autentificacion/autentificacion.module').then(
        (m) => m.AutentificacionModule
      ),
  },

  {
    path: '',
    loadChildren: () =>
      import('./modules/admin/admin.module').then(
        (m) => m.AdminModule),
  },

  {
    path: '',
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then(
        (m) => m.InicioModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/incidentes/incidentes.module').then(
        (m) => m.IncidentesModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/ciudadanos/ciudadanos.module').then(
        (m) =>m.CiudadanosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
