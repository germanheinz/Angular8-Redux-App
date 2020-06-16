import { createReducer, on } from '@ngrx/store';
import * as clientAction from './client.actions';
import { Client } from 'src/app/models/client.model';
import { getClients, unSetClients } from './client.actions';

export interface State {
    client: Client[];
}

export const initialState: State = {
   client: null,
}

const _clientReducer = createReducer(initialState,

    on(getClients, (state, { client }) => ({ ...state, client: {...client}})),
    on(unSetClients, state => ({ ...state, client: null})),

);

export function clientReducer(state, action) {
    return _clientReducer(state, action);
}