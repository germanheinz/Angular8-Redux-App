import { Injectable } from '@angular/core';

import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user : User;
  private _token: string;

  constructor(private http: HttpClient) { }


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

}
