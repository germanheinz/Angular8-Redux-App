import { Injectable } from '@angular/core';

import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user : User;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) { this.loadStorage(); }

  loadStorage() {
    this._token = sessionStorage.getItem('token');
    this._user = JSON.parse(sessionStorage.getItem('usuario'));
    if (this.token) {
    console.log('entro a cargarStroage' + this._token);
    } else {
      console.log('paso por el else cargarStroage' + this._token);
      this._token = '';
      this._user = null;
    }
  }
  // LOGIN
  login(user: User): Observable<any> {

    const url = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales});

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    console.log(params.toString());

    return this.http.post<any>(url, params.toString(), {headers: httpHeaders});
  }

  // REGISTER
  register(user: User): Observable<any>{
    const url = 'http://localhost:8080/api/user/create';
    return this.http.post<any>(url, user);
  }

  logout(): void {
    this._token = null;
    this._user = null;
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  // GETTER TOKEN //
  // GUARDAR EN STORAGE //
  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
        this._token = sessionStorage.getItem('token');
        return this._token;
    }
    return null;
  }

  // IS LOGGED
  isLogged(){
    console.log(this._token);
    this._token = this.token;
    return this._token.length > 5 ? true : false;
  }

  // LOCAL STORAGE: USER
  saveUser(accessToken: string): void{
    let payload = this.payload(accessToken);
    this._user = new User(payload.username, payload.password);
    this._user.nombre = payload.nombre;
    this._user.apellido = payload.apellido;
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  // LOCAL STORAGE: TOKEN
  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', this._token);
  }

  payload(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }

}
