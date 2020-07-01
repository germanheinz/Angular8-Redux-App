import { createReducer, on } from '@ngrx/store';
import { Client } from 'src/app/models/client.model';
import { setClients, unSetClients, createClient, deleteClient, updateClient, clearClient, savedClear, setClientsSuccess } from '../actions';
import { AppState } from '../app.reducer';
import { setClientsError } from '../actions/client.actions';
import { state } from '@angular/animations';

export interface ClientState {
    // getClient: Client[],
    // toUpdate : Client,
    err      : any,
    clients  : Client[],
    loading   : boolean,
    loaded    : boolean
}

export interface AppStateWithClient extends AppState{
    clients: ClientState
}

export const clientInitialState: ClientState = {
//    getClient : null,
//    toUpdate  : null,
   err       : null,
   clients   : [],
   loading   : false,
   loaded    : false
}

const _clientReducer = createReducer(clientInitialState,
    on(setClients, (state) => ({ ...state, loading: true })),
    on(setClientsSuccess, (state, { clients }) => ({ ...state, clients: [...clients], loading: false, loaded: true })),
    on(setClientsError, (state, {payload}) => ({...state, loading: false, loaded: false, err: { url: payload.url, name: payload.name, message: payload.message}})),

    on(unSetClients, state => ({ ...state, getClient: null })),
    on(updateClient, (state, { client }) => ({ ...state, toUpdate: {...client}})),
    on(clearClient, (state) => ({ ...state })),
    on(deleteClient, (state) => ({ ...state})),
    on(createClient, (state, { client }) => ({ ...state, saved: {...client}})),
    on(savedClear, state => ({ ...state, savedClear: null}))
);

export function clientReducer(state, action) {
    return _clientReducer(state, action);
}