import { Component, OnInit, OnDestroy,ViewChild, SimpleChanges, Input, AfterContentInit } from '@angular/core';
import { ClientService } from '../../services/client/client.service';
import { Client } from 'src/app/models/client.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClientModalComponent } from './client-dialog-update/client-modal.component';
import { ClientDialogCreateComponent } from './client-dialog-create/client-dialog-create.component';
import Swal from 'sweetalert2';
import * as clientActions from '../../store/actions/client.actions';
import { AppStateWithClient } from '../../store/reducers/client.reducer';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {

  clientSubscription: Subscription;

  displayedColumns = ['seqNo', 'description', 'duration', 'actions'];
  clientToUpdate: Client;

  clients: Client[] = [];
  loading: boolean = false;
  err    : any;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Client>;


  constructor(private clientService: ClientService, public dialog: MatDialog, private store: Store<AppStateWithClient>) {}

  ngOnInit(): void {

    this.clientSubscription = this.store.select('clients').subscribe(({clients, err, loading}) => {
      this.clients = clients;
      this.loading = loading;
      this.err     = err;
    });
    this.store.dispatch(clientActions.setClients());
  }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe();
  }

  getClients(){
    return this.clientService.getClients().subscribe(clients => { this.clients = clients;});
  }

  deleteClient(id: number){
    return this.clientService.delete(id).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: 'Client Removed ',
        showConfirmButton: false,
        timer: 1000
      }),
      this.store.dispatch(clientActions.deleteClient());
      this.getClients();
    }, error => {

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! ',
      });
    });
  }

  clientDialogUpdate(client: Client) {
    this.clientToUpdate = {...client};
    this.store.dispatch(clientActions.updateClient({client: {...this.clientToUpdate}}));
    const dialogRef = this.dialog.open(ClientModalComponent, {data: client});
    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(clientActions.clearClient());
      console.log(`Dialog result: ${result}`);
      this.getClients();
    });
  }

  clientDialogCreate() {
    const dialogRef = this.dialog.open(ClientDialogCreateComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getClients();
    });
  }
}
