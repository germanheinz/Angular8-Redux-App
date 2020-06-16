// Reducer global de la APP, lo enviaremos al app.module 

import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as client from './pages/client/client.reducer';

export interface AppState {
    ui    : ui.State,
    auth  : auth.State,
    client: client.State
}

export const appReducers: ActionReducerMap<AppState> = {
   ui    : ui.uiReducer,
   auth  : auth.authReducer,
   client: client.clientReducer
}