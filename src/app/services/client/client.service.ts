import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from '../../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from 'src/app/models/client.model';
import * as actions from '../../store/actions';
import { AuthService } from '../auth/auth.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private store: Store<AppState>) { }


  id: String;
  private _client: Client[] = [];

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private addAuthorizationHeader() {
    const token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAuthorized(e): boolean {
    if (e.status === 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }
    if (e.status === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! ' + this.authService.payload.name + ' is not a valid User',
      });
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }

  getClients() {
    const url = environment.URL + '/api/clientes';
    return this.http.get(url).pipe(map((resp: Client[]) => {
      this._client = resp;
      return resp;
     }));
  }

  createClient(client: Client){
    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales});

    const url = environment.URL + '/api/clientes/create';
    return this.http.post(url, client, {headers: this.addAuthorizationHeader()}).pipe(map((resp) => {
    }));
  }

  updateClient(client: Client){

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales});

    const url = environment.URL + '/api/clientes/' + client.id;
    return this.http.put<Client>(url, client, {headers: this.addAuthorizationHeader()})
      .pipe(catchError(e => {
        if (this.isNoAuthorized(e)) {
          return throwError(e);
        }
        if (e.status === 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
        return throwError(e);
      }
    ));
  }
  delete(id: number){
    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales});

    const url = environment.URL + '/api/clientes/' + id;
    return this.http.delete(url, {headers: this.addAuthorizationHeader()});
  }
}
