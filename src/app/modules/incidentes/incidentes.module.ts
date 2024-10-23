import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentesRoutingModule } from './incidentes-routing.module';
import { RegistroIncidentesComponent } from './registro-incidentes/registro-incidentes.component';




@NgModule({
  declarations: [
    RegistroIncidentesComponent
  ],
  imports: [
    CommonModule,
    IncidentesRoutingModule,

  ],
  exports:[
    RegistroIncidentesComponent
  ]
})
export class IncidentesModule { }
