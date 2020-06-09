import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './header/header.component';


const pagesRoutes: Routes = [
  {
      path: '',
      component: PagesComponent,
      children: [
        { path: 'header', component: HeaderComponent, data: { titulo: 'Header' }},
        { path: '', redirectTo: '/header', pathMatch: 'full' }
      ]
  }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
