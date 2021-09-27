import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    CATEGORIES_LOADED,
    CATEGORIES_LOADING,
    CATEGORY_ERROR,
    CATEGORY_SAVED,
    CATEGORY_UPDATED,
    CATEGORY_LOADING,
    CATEGORY_LOADED,
    CATEGORY_DELETED
} from './actionTypes';

// Get all categories for Admin Dashboard
export const loadCategories = () => (dispatch, getState) => {
    // Categories loading
    dispatch({ type: CATEGORIES_LOADING });

    axios
        .get('/api/categories/view', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: CATEGORIES_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: CATEGORY_ERROR
            });
        });
};

// Add new Category from Admin Dashboard
export const addCategory = (name, miniature) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ name, miniature });

    console.log('here');
    axios
        .post('/api/categories/save', body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: CATEGORY_SAVED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: CATEGORY_ERROR
            });
        });
};

// Get Category chosen in categories list
export const getCategory = (id) => (dispatch, getState) => {

    // Category loading
    dispatch({ type: CATEGORY_LOADING });

    axios
        .get(`/api/categories/get/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: CATEGORY_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'CATEGORY_ERROR');
            dispatch({
                type: CATEGORY_ERROR
            });
        });
};


//Change Category name and miniature
export const updateCategory = (id, name, miniature) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ name, miniature });

    axios
        .patch(`/api/categories/update/${id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: CATEGORY_UPDATED
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'CATEGORY_ERROR');
            dispatch({
                type: CATEGORY_ERROR
            });
        });
};

// Delete Category
export const deleteCategory = (id) => (dispatch, getState) => {

    axios
        .delete(`/api/categories/delete/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: CATEGORY_DELETED
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'CATEGORY_ERROR');
            dispatch({
                type: CATEGORY_ERROR
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