import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaDeServicioComponent } from './area-de-servicio/area-de-servicio.component';
import { TipoDeIncidentesComponent } from './tipo-de-incidentes/tipo-de-incidentes.component';

const routes: Routes = [

{
  path:'area-servicio',component:AreaDeServicioComponent
},
{
  path: 'tipo-incidente',component:TipoDeIncidentesComponent
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
