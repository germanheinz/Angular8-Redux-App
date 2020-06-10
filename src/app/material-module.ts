import {NgModule} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule
  ]
})
export class MaterialModule {}
