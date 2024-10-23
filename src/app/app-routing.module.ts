import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
   
    //{path:"",component:LoginComponent},
    //{ path: 'admin', component: AdminComponent },
    //{path:"",loadChildren:()=>import('./modules/seguridad/seguridad.module').then(m=>m.SeguridadModule)},
    //{path:"",loadChildren:()=>import('./modules/configuracion/configuracion.module').then(m=>m.ConfiguracionModule)},
    //{path:"",loadChildren:()=>import('./modules/movimientos/movimientos.module').then(m=>m.MovimientosModule)}
    //{path: '', redirectTo: '/inicio', pathMatch: 'full'},

    {
      path:"",loadChildren:()=>import('./modules/autentificacion/autentificacion.module').then(m=>m.AutentificacionModule)
    },

    {
      path:"",loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
    },

    {
      path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
