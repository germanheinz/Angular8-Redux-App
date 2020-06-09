import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './page-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
  ],
  exports:[HeaderComponent],
  imports: [
    CommonModule,
    PAGES_ROUTES,
    MatSliderModule,
  ]
})
export class PagesModule { }
