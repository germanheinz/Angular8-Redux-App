import { Injectable } from '@angular/core';
import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';
import * as clientsActions from '../actions/clients.actions';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { ClientService } from '../../services/client/client.service';
import { of } from 'rxjs/internal/observable/of';
import { setClientsSuccess } from '../actions/clients.actions';
import { Client } from 'src/app/models/client.model';


@Injectable()
export class ClientsEffects{

    // Simbolo de dolar indica que va a ser un Observable
    constructor(private actions$: Actions, private clientService: ClientService ){}

    // 1 forma
    // @Effect({dispatch: false})
    // setClients$ = createEffect(
    //     () => this.actions$.pipe(
    //         ofType( clientsActions.setClients ),
    //         mergeMap(
    //             () => this.clientService.getClients()
    //             .pipe(
    //                 tap( data => console.log('effect data', data)),
    //                 map(clients => clientsActions.setClientsSuccess({client: clients})),
    //                 // catchError(err => of(clientsActions.setClientsError({payload: err})))
    //             )
    //         )
    //     )
    // );

    // 2 Forma
    // getClientsEffect$ =  createEffect(() => this.actions$.pipe(
    //     tap(data => console.log(data)),
    //     ofType(clientsActions.setClients),
    //     switchMap( () => {
    //         return this.clientService.getClients().pipe(
    //             tap(data => console.log(data)),
    //             map((clients: Client[]) => {
    //                 return clientsActions.setClientsSuccess({clients: clients});
    //               }),
    //             catchError((error: Error) => {
    //                 return of(clientsActions.setClientsError({payload: error}));
    //             })
    //         );
    //     })
    //     )
    //   );


    // Este efecto no envia ningun parametro, por eso se podria hacer un snippet, cambiaria solo la linea 39
    // con el servicio que se necesite, y la respuesta con la lunea 43
    // Operador of crea un observable, necesito el obsevable porque effect debe devolver observable
    @Effect()
    getClientsEffect$ = this.actions$
    .pipe(
        ofType(clientsActions.setClients),
        tap(data => console.log(data)),
        mergeMap( () => {
            return this.clientService.getClients()
            .pipe(
                tap(data => console.log(data)),
                map( data => clientsActions.setClientsSuccess({clients: data})),
                catchError(err => of(clientsActions.setClientsError({payload: err})))
            );
        })
   );
}