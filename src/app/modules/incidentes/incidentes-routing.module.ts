import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroIncidentesComponent } from './registro-incidentes/registro-incidentes.component';

const routes: Routes = [


  {
    path:"registro",component:RegistroIncidentesComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncidentesRoutingModule { }
