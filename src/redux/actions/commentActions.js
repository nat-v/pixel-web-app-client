import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    COMMENT_ADDED,
    COMMENT_ERROR,
    COMMENTS_LOADED,
    COMMENTS_LOADING,
    COMMENT_DELETED
} from './actionTypes';

// Add Comment to current Post
export const addComment = (_author, _post, text) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ _author, _post, text });

    console.log(body);

    axios
        .post('/api/comments/add', body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: COMMENT_ADDED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'COMMENT_ERROR');
            dispatch({
                type: COMMENT_ERROR
            });
        });
};

// Get comment of current Post
export const getComments = (id) => (dispatch, getState) => {
    // Comments loading
    dispatch({ type: COMMENTS_LOADING });

    axios
        .get(`/api/comments/get/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: COMMENTS_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'COMMENT_ERROR');
            dispatch({
                type: COMMENT_ERROR
            });
        });
};

// Load all comments
export const loadAllComments = (id) => (dispatch, getState) => {
    // Comments loading
    dispatch({ type: COMMENTS_LOADING });

    axios
        .get('/api/comments/all', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: COMMENTS_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'COMMENT_ERROR');
            dispatch({
                type: COMMENT_ERROR
            });
        });
};


// Delete Comment
export const deleteComment = (id) => (dispatch, getState) => {

    axios
        .delete(`/api/comments/delete/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: COMMENT_DELETED
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'COMMENT_ERROR');
            dispatch({
                type: COMMENT_ERROR
            });
        });
};

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};