import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutentificacionRoutingModule } from './autentificacion-routing.module';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';


@NgModule({
  declarations: [
    InicioSesionComponent,
  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule
  ]
})
export class AutentificacionModule { }
