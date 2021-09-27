import {
    USER_LOADED,
    USER_LOADING,
    USER_ERROR,
    USERS_LOADED,
    GET_USER
} from '../actions/actionTypes';

const initialState = {
    isLoaded: null,
    isLoading: false,
    chosenUser: null,
    users: []
};

export const User = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case GET_USER:
            return {
                ...state,
                isLoading: true,
                isLoading: false,
                user: action.payload
            };
        case USER_LOADED:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                chosenUser: action.payload
            };
        case USERS_LOADED:
            return {
                ...state,
                users: action.payload,
                isLoaded: true,
                isLoading: false
            };
        case USER_ERROR:
            return {
                ...state,
                user: null,
                users: [],
                isLoaded: false,
                isLoading: false
            };
        default:
            return state;
    }
}