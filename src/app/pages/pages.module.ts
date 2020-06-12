import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './page-routing.module';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material-module';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ContactComponent,
  ],
  exports:[],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    MaterialModule
  ]
})
export class PagesModule { }
