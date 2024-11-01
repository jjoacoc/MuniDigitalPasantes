import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentesRoutingModule } from './incidentes-routing.module';
import { RegistroIncidentesComponent } from './registro-incidentes/registro-incidentes.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    RegistroIncidentesComponent
  ],
  imports: [
    CommonModule,
    IncidentesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule
  ],
  exports:[
    RegistroIncidentesComponent
  ]
})
export class IncidentesModule { }
