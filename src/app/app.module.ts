import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//componentes
import { AdminModule } from './modules/admin/admin.module';
import { SharedModule } from './modules/shared/shared.module';


//importaciones de angular


@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AdminModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
