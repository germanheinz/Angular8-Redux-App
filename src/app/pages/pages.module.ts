import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './page-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
  ],
  exports:[],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    MatSliderModule,
  ]
})
export class PagesModule { }
