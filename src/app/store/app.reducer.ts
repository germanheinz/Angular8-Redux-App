// Reducer global de la APP, lo enviaremos al app.module 
import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
    ui     : reducers.UIState,
    auth   : reducers.AuthState,
    clients: reducers.ClientsState,
    client : reducers.ClientState;

}

export const appReducers: ActionReducerMap<AppState> = {
   ui     : reducers.uiReducer,
   auth   : reducers.authReducer,
   clients: reducers.clientsReducer,
   client : reducers.clientReducer
}