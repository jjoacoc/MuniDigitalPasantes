import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { AreaDeServicioComponent } from './area-de-servicio/area-de-servicio.component';
import { TipoDeIncidentesComponent } from './tipo-de-incidentes/tipo-de-incidentes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AreaDeServicioComponent,
    TipoDeIncidentesComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class ConfiguracionModule { }
