import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_SUCCESS,
} from '../constants';
import { createReducer } from '../utils';

const initialState = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    error: null,
    statusText: null,
    firstName: null,
    lastName: null,
    email: null,
    userUUID: null
}

export default createReducer(initialState, {
    [AUTH_LOGIN_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: true
        });
    },
    [AUTH_LOGIN_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            firstName: payload.user.first_name,
            lastName: payload.user.last_name,
            email: payload.user.email,
            token: payload.token,
            userUUID: payload.user.id
        });
    },
    [AUTH_LOGIN_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            error: payload.error,
            statusText: payload.statusText
            
        })
    }
})