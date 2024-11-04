import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiudadanosRoutingModule } from './ciudadanos-routing.module';
import { ListadoDeCiudadanosComponent } from './listado-de-ciudadanos/listado-de-ciudadanos.component';
import { ListarBeneficiosComponent } from './listar-beneficios/listar-beneficios.component';


@NgModule({
  declarations: [
    ListadoDeCiudadanosComponent,
    ListarBeneficiosComponent
  ],
  imports: [
    CommonModule,
    CiudadanosRoutingModule
  ],
  exports:[
    ListadoDeCiudadanosComponent,
    ListarBeneficiosComponent
  ]
})
export class CiudadanosModule { }
