import { createAction, props } from '@ngrx/store';
import { Client } from 'src/app/models/client.model';

export const getClients = createAction('[Clients] getClients', props<{client: Client[]}>());

export const unSetClients = createAction('[Clients] unSetClients');