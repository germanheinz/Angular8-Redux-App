import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const setUser = createAction('[Auth] setUser');
export const setUserSuccess = createAction('[Auth] setUserSuccess', props<{user: User}>());
export const unSetUser = createAction('[Auth] unSetUser');