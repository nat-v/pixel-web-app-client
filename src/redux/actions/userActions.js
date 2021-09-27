import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    USER_PROFILE,
    USER_ERROR,
    GET_USER,
    USERS_LOADED
} from './actionTypes';

// Get user data to view the profile
export const getUser = (username) => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios
        .get(`/api/users/profile/${username}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'USER_ERROR');
            dispatch({
                type: USER_ERROR
            });
        });
};

// Load all users of the system
export const loadUsers = () => (dispatch, getState) => {
    // Users loading
    dispatch({ type: USER_LOADING });

    axios
        .get('/api/users/all', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: USERS_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status), 'USER_ERROR');
            dispatch({
                type: USER_ERROR
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