import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from 'src/app/models/client.model';
import * as clientActions from '../../pages/client/client.actions';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) { }


  id: String;
  private _client: Client[] = [];

  // private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getClients() {
    const url = environment.URL + '/api/clientes';
    return this.http.get(url).pipe(map((resp: Client[]) => {
      this._client = resp;
      this.store.dispatch(clientActions.getClients({client: this._client}));
      return resp;
     }));
  }
}
