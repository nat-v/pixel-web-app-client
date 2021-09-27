import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    SAVE_IMAGE,
    GET_IMAGE,
    IMAGE_LOADING,
    IMAGE_DELETED,
    IMAGE_UPDATED,
    IMAGE_ERROR,
    EXPORT_IMAGE
} from './actionTypes';


// Save the Image to User gallery
export const saveToGallery = (_creator, name, cols, rows, path) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ _creator, name, cols, rows, path });

    axios
        .post('/api/images/save', body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: SAVE_IMAGE
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: IMAGE_ERROR
            });
        });
};


// Get Image chosen in gallery
export const getImage = (id) => (dispatch, getState) => {

    // Image loading
    dispatch({ type: IMAGE_LOADING });

    axios
        .get(`/api/images/get/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_IMAGE,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: IMAGE_ERROR
            });
        });
};

// Delete Image and related data in Post and User models
export const deleteImage = (id) => (dispatch, getState) => {

    axios
        .delete(`/api/images/delete/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: IMAGE_DELETED
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: IMAGE_ERROR
            });
        });
};

//Change Image name
export const updateImage = (id, name) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ name });

    axios
        .patch(`/api/images/update/${id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: IMAGE_UPDATED
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: IMAGE_ERROR
            });
        });
};

//Export the image to device
export const exportImage = (uri) => {
    var link = document.createElement('a');
    link.download = 'pixel_art';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return {
        type: EXPORT_IMAGE
    };
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