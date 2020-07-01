// Snippet ngrx-reducer + tab

import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from '../actions';

export interface UIState {
    isLoading: boolean;
}

export const uiInitialState: UIState = {
   isLoading: false,
}

const _uiReducer = createReducer(uiInitialState,

    on(isLoading, state   => ({ ...state, isLoading: true})),
    on(stopLoading, state => ({ ...state, isLoading: false})),

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}