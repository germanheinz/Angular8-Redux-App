import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Client } from 'src/app/models/client.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { formatDate } from '@angular/common';
import { ClientService } from '../../../services/client/client.service';
import * as clientActions from '../../../store/actions/client.actions';
import { AppState } from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AppStateWithClient } from '../../../store/reducers/client.reducer';


@Component({
  selector: 'app-client-dialog-create',
  templateUrl: './client-dialog-create.component.html',
  styleUrls: ['./client-dialog-create.component.css']
})
export class ClientDialogCreateComponent implements OnInit {

  clients: Client[] = [];
  client: Client;
  clientToUpdate: Client;

  clientSubscription: Subscription;

  // FORM
  form: FormGroup;

  constructor(private clientService: ClientService,public dialog: MatDialog, private store: Store<AppStateWithClient>) { }

  ngOnInit(): void {
    this.form =  new FormGroup({
      nombre   :  new FormControl(''),
      apellido :  new FormControl(''),
      email    :  new FormControl(''),
    });
  }

  createClient(){
    var createdDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.client          = new Client();
    this.client.nombre   = this.form.value.nombre;
    this.client.apellido = this.form.value.apellido;
    this.client.email    = this.form.value.email;
    this.client.createAt = createdDate;

    this.clientService.createClient(this.client).subscribe(resp => {
    console.log(resp);
    Swal.fire({
      icon: 'success',
      title: 'Client Removed ',
      showConfirmButton: false,
      timer: 1000
    }),
    // this.store.dispatch(clientActions.createClient({client: this.client}));
    // this.store.dispatch(clientActions.setClientsSuccess({client: this.clients}));
    this.dialog.closeAll();
    }, error => {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! ',
    });
    });
  }

}
