import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { UsuarioComponent } from './component/usuario/usuario.component';
import { GrupoComponent } from './component/grupo/grupo.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    UsuarioComponent,
    GrupoComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [UsuarioComponent,
    GrupoComponent],
})
export class AdminModule { }
