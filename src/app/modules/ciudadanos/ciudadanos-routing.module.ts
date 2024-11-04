import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoDeCiudadanosComponent } from './listado-de-ciudadanos/listado-de-ciudadanos.component';
import { ListarBeneficiosComponent } from './listar-beneficios/listar-beneficios.component';

const routes: Routes = [
  {
    path:"listado-de-ciudadanos",component:ListadoDeCiudadanosComponent
  },
  {
    path:"listar-beneficios",component:ListarBeneficiosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiudadanosRoutingModule { }
