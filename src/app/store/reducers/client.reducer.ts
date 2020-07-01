import { createReducer, on } from '@ngrx/store';
import { Client } from 'src/app/models/client.model';
import { setClient, setClientSuccess , setClientError } from '../actions';
export interface ClientState {
    err      : any,
    loading  : boolean,
    loaded   : boolean
    client   : Client,
}
export const clientInitialState: ClientState = {
   err       : null,
   loading   : false,
   loaded    : false,
   client    : null
}

const _clientReducer = createReducer(clientInitialState,
    on(setClient, (state) => ({ ...state, loading: true })),
    on(setClientSuccess, (state, { client }) => ({ ...state, clients: [...client], loading: false, loaded: true })),
    on(setClientError, (state, {payload}) => ({...state, loading: false, loaded: false, err: { url: payload.url, name: payload.name, message: payload.message}})),
);

export function clientReducer(state, action) {
    return _clientReducer(state, action);
}