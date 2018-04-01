import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { checkHttpStatus, parseJSON } from '../utils'; 
import { AUTH_LOGIN_REQUEST, 
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGIN_FAILURE,
    SERVER_URL
} from '../constants';

export function authLoginRequest() {
    return {
        type: AUTH_LOGIN_REQUEST
    }
}

export function authLoginSuccess(token, user) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: {
            token,
            user
        }
    }
}

export function authLoginFailure(error, message) {
    sessionStorage.removeItem('token');
    return {
        type: AUTH_LOGIN_FAILURE,
        payload: {
            status: error,
            statusText: message
        }
    }
}

export function authLogout() {
    
}

export function authLogin(email, password, redirect='/') {
    return (dispacth) => {
        dispacth(authLoginRequest());
        const token = btoa(`${email}:${password}`);
        return fetch(`${SERVER_URL}/api/v1/accounts/login`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispacth(authLoginSuccess(response.token, response.user));
                dispacth(push(redirect));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispacth(authLoginFailure(401, data.data.non_field_errors[0]));
                    });
                }
                else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(authLoginUserFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(authLoginUserFailure('Connection Error', 'An error occurred while sending your data!'));
                }
            });
        
    }
}
