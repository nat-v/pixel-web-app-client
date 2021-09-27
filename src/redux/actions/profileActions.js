import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    PROFILE_PICTURE_CHANGED,
    BACKGROUND_PICTURE_CHANGED,
    USER_UPDATED,
    USER_UPDATE_ERROR,
    PASSWORD_CHANGED
} from './actionTypes';


// Check token & update Profile photo
/*export const uploadPhoto = (file) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify(file);

    axios
        .patch('/api/users/photo/:id', body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: PROFILE_PHOTO_CHANGED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: USER_UPDATE_ERROR
            });
        });
};*/

// Update User info (Update Profile)
export const updateProfile = (id, { displayName, username, bio }) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ displayName, username, bio });

    axios
        .patch(`/api/users/update/${id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: USER_UPDATED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(err.response.data, err.response.status, 'USER_UPDATE_ERROR')
            );
            dispatch({
                type: USER_UPDATE_ERROR
            });
        });
};

// Change password
export const changePassword = (id, { oldPass, newPass }) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ oldPass, newPass });

    axios
        .patch(`/api/users/update/password/${id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: PASSWORD_CHANGED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'USER_UPDATE_ERROR')
            );
            dispatch({
                type: USER_UPDATE_ERROR
            });
        });
};

// Change profile picture
export const updateProfilePic = (id, profilePic) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ profilePic });

    axios
        .patch(`/api/users/update/picture/${id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: PROFILE_PICTURE_CHANGED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'USER_UPDATE_ERROR')
            );
            dispatch({
                type: USER_UPDATE_ERROR
            });
        });
};

// Change background picture
export const updateBackgroundPic = (id, backgroundPic) => (dispatch, getState) => {

    // Request body
    const body = JSON.stringify({ backgroundPic });

    axios
        .patch(`/api/users/update/background/${id}`, body, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: BACKGROUND_PICTURE_CHANGED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'USER_UPDATE_ERROR')
            );
            dispatch({
                type: USER_UPDATE_ERROR
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