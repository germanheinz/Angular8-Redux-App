import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../services/auth.guard';
import { ContactComponent } from './contact/contact.component';


const pagesRoutes: Routes = [
  {
      path: '',
      component: PagesComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'home', component: HomeComponent, data: { titulo: 'Home' }},
        { path: 'contact', component: ContactComponent, data: { titulo: 'Contact' }},
        { path: '', redirectTo: 'home', pathMatch: 'full' }
      ]
  }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
