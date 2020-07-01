import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import * as clientsActions from '../actions/client.actions';
import { tap, mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import { ClientService } from '../../services/client/client.service';
import { setClients } from '../actions/client.actions';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class ClientsEffects{

    // Simbolo de dolar indica que va a ser un Observable
    constructor(private actions$: Actions, private clientService: ClientService ){}

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

    // Este efecto no envia ningun parametro, por eso se podria hacer un snippet, cambiaria solo la linea 39
    // con el servicio que se necesite, y la respuesta con la lunea 43
    // Operador of crea un observable, necesito el obsevable porque effect debe devolver observable
    @Effect({dispatch: true})
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