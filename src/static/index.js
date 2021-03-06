import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';


import { authLoginSuccess } from './actions/auth';
import configureStore from './store/configureStore';
import App from './app';


const initialState = {};
const target = document.getElementById('root');

const history = createHistory();
const store = configureStore(initialState, history);

const node = (
    <App store={store} history={history} />
);


const token = sessionStorage.getItem('token');
let user = {};
try {
    user = JSON.parse(sessionStorage.getItem('user'));
} catch (e) {
    // Failed to parse
}

if (token !== null) {
    store.dispatch(authLoginSuccess(token, user));
}

ReactDOM.render(node, target);