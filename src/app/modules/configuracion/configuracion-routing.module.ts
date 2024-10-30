import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaDeServicioComponent } from './area-de-servicio/area-de-servicio.component';

const routes: Routes = [

{
  path:'area-servicio',component:AreaDeServicioComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
