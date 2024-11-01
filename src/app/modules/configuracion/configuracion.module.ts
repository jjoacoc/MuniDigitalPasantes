import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { AreaDeServicioComponent } from './area-de-servicio/area-de-servicio.component';
import { TipoDeIncidentesComponent } from './tipo-de-incidentes/tipo-de-incidentes.component';


@NgModule({
  declarations: [
    AreaDeServicioComponent,
    TipoDeIncidentesComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule
  ]
})
export class ConfiguracionModule { }
