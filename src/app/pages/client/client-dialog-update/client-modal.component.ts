import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientService } from '../../../services/client/client.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as clientActions from '../client.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.css']
})
export class ClientModalComponent implements OnInit {

  client: Client;
  clientToUpdate: Client;
  clients: Client[] = [];

  clientSubscription: Subscription;

  // FORM
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Client,
              private store: Store<AppState>,
              private clientService: ClientService,
              public dialog: MatDialog) {this.client = data;}

  ngOnInit(): void {
    this.form =  new FormGroup({
      nombre   :  new FormControl(''),
      apellido :  new FormControl(''),
      email    :  new FormControl(''),
    });
    this.setDefaultValues();
    // this.store.dispatch(clientActions.updateClient({client: this.client}));
    this.clientSubscription = this.store.select('client').subscribe(client => { });
  }

  setDefaultValues(){
    this.form.setValue({
      nombre  : this.data.nombre,
      apellido: this.data.apellido,
      email   : this.data.email
    });
  }

  updateClient(){
    // this.clientToUpdate          = new Client();
    // this.clientToUpdate.id       = this.client.id;
    // this.clientToUpdate.nombre   = this.form.value.nombre;
    // this.clientToUpdate.apellido = this.form.value.apellido;
    // this.clientToUpdate.email    = this.form.value.email;
    // this.clientToUpdate.createAt = this.client.createAt;
    var id = this.client.id;
    var createAt = this.client.createAt;
    this.client = this.form.value;
    this.client.id = id;
    this.client.createAt = createAt;
    // this.clients.push(this.clientToUpdate);

    this.clientService.updateClient({...this.client}).subscribe(resp => {
    //  this.store.dispatch(clientActions.updateClient({client: {...this.client}}));
    
    });
    this.dialog.closeAll();
  }
  closeDialog(){
    this.dialog.closeAll();
  }
}
