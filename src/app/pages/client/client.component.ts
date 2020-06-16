import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { Client } from 'src/app/models/client.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import * as clientActions from './client.actions';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {

  client: Client[] = [];
  clientSubscription: Subscription;

  constructor(private clientService: ClientService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.clientSubscription = this.store.select('client').subscribe(client => { this.client = client.client; });
    this.getClients();
  }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe();
  }

  async getClients(){
    return await this.clientService.getClients().subscribe(resp => { this.client = resp; console.log(this.client);});
  }

}
