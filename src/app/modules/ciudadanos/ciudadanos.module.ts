import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { CiudadanosRoutingModule } from './ciudadanos-routing.module';
import { ListadoDeCiudadanosComponent } from './listado-de-ciudadanos/listado-de-ciudadanos.component';


@NgModule({
  declarations: [
    ListadoDeCiudadanosComponent,
  ],
  imports: [
    CommonModule,
    CiudadanosRoutingModule,
    ReactiveFormsModule 
  ],
  exports:[
    ListadoDeCiudadanosComponent
  ]
})
export class CiudadanosModule { }
