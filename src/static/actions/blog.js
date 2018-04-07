import fetch from 'isomorphic-fetch';

import { CREATE_BLOG_REQUEST,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_FAILURE,
    FETCH_BLOG_REQUEST,
    FETCH_BLOG_SUCCESS,
    FETCH_BLOG_FAILURE,
    SERVER_URL
} from '../constants';
import { checkHttpStatus, parseJSON } from '../utils';
import { authLoginSuccess } from './auth';

export function createBlogRequest() {
    return {
        type: CREATE_BLOG_REQUEST
    }
}

export function createBlogSuccess() {
    return {
        type: CREATE_BLOG_SUCCESS
    }
}

export function createBlogFailure() {
    return {
        type: CREATE_BLOG_FAILURE
    }
}

export function createBlog(data, token) {
    return (dispacth) => {
        dispacth(createBlogRequest());
        return fetch(`${SERVER_URL}/api/v1/blog/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispacth(authLoginSuccess())
            })
    }
}

export function fetchBlogRequest() {
    return {
        type: FETCH_BLOG_REQUEST
    }
}

export function fetchBlogSuccess(data) {
    return {
        type: FETCH_BLOG_SUCCESS,
        payload: {
            data
        }
    }
}

export function fetchBlogFailure() {
    return {
        type: FETCH_BLOG_FAILURE
    }
}

export function fetchBlog(token) {
    return (dispacth) => {
        dispacth(fetchBlogRequest());
        return fetch(`${SERVER_URL}/api/v1/blog/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispacth(fetchBlogSuccess(response))
            })
            .catch((error) => {
                console.log(error)
            })
    }
}