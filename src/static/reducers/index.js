import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import blogReducer from './blog';

export default combineReducers({
    auth: authReducer,
    blog: blogReducer
});
