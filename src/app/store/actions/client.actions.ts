import { createAction, props } from '@ngrx/store';
import { Client } from 'src/app/models/client.model';

export const setClient = createAction('[Client] setClient');

export const setClientSuccess = createAction(
    '[Clients] setClient Success', props<{client: Client[]}>()
);
export const setClientError = createAction(
    '[Client] set Client Error',
    props<{ payload: any }>()
);
