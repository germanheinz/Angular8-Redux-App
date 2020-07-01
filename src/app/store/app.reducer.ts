// Reducer global de la APP, lo enviaremos al app.module 
import { ActionReducerMap } from '@ngrx/store';
// import * as ui from '../shared/ui.reducer';
// import * as auth from './reducers/auth.reducer';
// import * as client from './reducers/client.reducer';
import * as reducers from './reducers';


export interface AppState {
    ui     : reducers.UIState,
    auth   : reducers.AuthState,
    clients: reducers.ClientState;
}

export const appReducers: ActionReducerMap<AppState> = {
   ui     : reducers.uiReducer,
   auth   : reducers.authReducer,
   clients: reducers.clientReducer
}