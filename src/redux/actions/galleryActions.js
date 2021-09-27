import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    GALLERY_LOADED,
    GALLERY_LOADING,
    GALLERY_ERROR
} from './actionTypes';

// Load gallery of User Images
export const loadGallery = () => (dispatch, getState) => {
    // Gallery loading
    dispatch({ type: GALLERY_LOADING });

    axios
        .get('/api/gallery/view', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GALLERY_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: GALLERY_ERROR
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