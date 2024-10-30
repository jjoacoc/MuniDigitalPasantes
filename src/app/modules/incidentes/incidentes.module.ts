import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentesRoutingModule } from './incidentes-routing.module';
import { RegistroIncidentesComponent } from './registro-incidentes/registro-incidentes.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    RegistroIncidentesComponent
  ],
  imports: [
    CommonModule,
    IncidentesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    RegistroIncidentesComponent
  ]
})
export class IncidentesModule { }
