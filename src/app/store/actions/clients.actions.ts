import { createAction, props } from '@ngrx/store';
import { Client } from 'src/app/models/client.model';

export const setClients = createAction('[Clients] setClients');

export const setClientsSuccess = createAction(
    '[Clients] setClients Success', props<{clients: Client[]}>()
);
export const setClientsError = createAction(
    '[Clients] set Clients Error',
    props<{ payload: any }>()
);

export const unSetClients = createAction('[Clients] unSetClients');

export const updateClient = createAction('[Clients] updateClient', props<{client: Client}>());

export const clearClient = createAction('[Clients] updateClient');

export const createClient = createAction('[Clients] createClient', props<{client: Client}>());

export const savedClear = createAction('[Clients] createClient');

export const deleteClient = createAction('[Clients] deleteClient');
