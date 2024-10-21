import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GruposComponent } from './modules/admin/grupos/grupos.component';

const routes: Routes = [

  {
    path:"",component:GruposComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
