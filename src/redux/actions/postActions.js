import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    POST_CREATED,
    POST_ERROR,
    GET_ALL_POSTS,
    POSTS_LOADING,
    GET_POST,
    POST_UPDATED,
    POST_DELETED,
    POST_SAVED
} from './actionTypes';


//Create a new Post with Image
export const createPost = (_image, _author, { category, title, description }) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ _image, _author, category, title, description });

    axios
        .post('/api/posts/save', body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: POST_CREATED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'POST_ERROR');
            dispatch({
                type: POST_ERROR
            });
        });
};

// Add Post to Saved
export const addToSaved = (id, _post) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ _post });

    axios
        .patch(`/api/posts/saved/add/${id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: POST_SAVED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'POST_ERROR');
            dispatch({
                type: POST_ERROR
            });
        });
};

// Get all Posts of the current User
export const loadPosts = () => (dispatch, getState) => {
    // Posts loading
    dispatch({ type: POSTS_LOADING });

    axios
        .get('/api/posts/get', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_ALL_POSTS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'POST_ERROR');
            dispatch({
                type: POST_ERROR
            });
        });
}

// Get all Posts in the system
export const loadAllPosts = () => (dispatch, getState) => {
    // Posts loading
    dispatch({ type: POSTS_LOADING });

    axios
        .get('/api/posts/all', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_ALL_POSTS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'POST_ERROR');
            dispatch({
                type: POST_ERROR
            });
        });
};

// Load all posts from chosen category
export const loadPostsInCategory = (id) => (dispatch, getState) => {

    // Posts loading
    dispatch({ type: POSTS_LOADING });

    axios
        .get(`/api/posts/category/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_ALL_POSTS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'POST_ERROR');
            dispatch({
                type: POST_ERROR
            });
        });
};

// Get all saved Posts
export const loadSaved = (id) => (dispatch, getState) => {
    // Posts loading
    dispatch({ type: POSTS_LOADING });

    axios
        .get(`/api/posts/saved/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_ALL_POSTS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'POST_ERROR');
            dispatch({
                type: POST_ERROR
            });
        });
};

// Get Post to view/update
export const getPost = (id) => (dispatch, getState) => {
    // Post loading
    dispatch({ type: POSTS_LOADING });

    axios
        .get(`/api/posts/get/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'POST_ERROR');
            dispatch({
                type: POST_ERROR
            });
        });
};

//Change Post data
export const updatePost = (id, { category, title, description }) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ category, title, description });

    axios
        .patch(`/api/posts/update/${id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: POST_UPDATED
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'POST_ERROR');
            dispatch({
                type: POST_ERROR
            });
        });
};

// Delete Post and related data in Image and Category models
export const deletePost = (id) => (dispatch, getState) => {

    axios
        .delete(`/api/posts/delete/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: POST_DELETED
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'POST_ERROR');
            dispatch({
                type: POST_ERROR
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