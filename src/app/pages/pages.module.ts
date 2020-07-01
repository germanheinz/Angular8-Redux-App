import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './page-routing.module';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material-module';
import { ContactComponent } from './contact/contact.component';
import { ClientComponent } from './client/client.component';
import { ClientModalComponent } from './client/client-dialog-update/client-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientDialogCreateComponent } from './client/client-dialog-create/client-dialog-create.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ContactComponent,
    ClientComponent,
    ClientModalComponent,
    ClientDialogCreateComponent,
  ],
  exports:[],
  imports: [
    // StoreModule.forFeature('client', clientReducer),
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
