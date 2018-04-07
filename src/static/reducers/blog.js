import { CREATE_BLOG_REQUEST,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_FAILURE,
    FETCH_BLOG_REQUEST,
    FETCH_BLOG_SUCCESS,
    FETCH_BLOG_FAILURE
} from '../constants';
import { createReducer } from '../utils';

const initialState = {
    isFetching: false,
    isFetched: false,
    data: null,
    error: null,
    statusText: null
}

export default createReducer(initialState, {
    [FETCH_BLOG_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [FETCH_BLOG_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            isFetched: true,
            data: payload.data
        });
    },
    [FETCH_BLOG_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            isFetched: false,
            data: null,
            error: payload.error,
            statusText: payload.statusText
        })
    }
})