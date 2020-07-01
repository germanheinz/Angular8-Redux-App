import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser, setUserSuccess } from '../actions';
import { User } from '../../models/user.model';

export interface AuthState {
    user: User;
}

export const authInitialState: AuthState = {
   user: null,
}

const _authReducer = createReducer(authInitialState,
    on(setUser, (state) => ({ ...state })),
    on(setUserSuccess, (state, { user }) => ({ ...state, user: {...user}})),
    on(unSetUser, state => ({ ...state, user: null})),
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}