import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
