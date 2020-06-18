import { createReducer, on } from '@ngrx/store';
import { Client } from 'src/app/models/client.model';
import { setClients, unSetClients, createClient, deleteClient, updateClient, clearClient, savedClear } from './client.actions';
export interface State {
    getClient: Client[];
    toUpdate: Client;
}

export const initialState: State = {
   getClient : null,
   toUpdate: null
}

const _clientReducer = createReducer(initialState,
    on(setClients, (state, { client }) => ({ ...state, getClient: {...client}})),
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