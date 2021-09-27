import {
    POST_CREATED,
    POST_ERROR,
    GET_ALL_POSTS,
    POSTS_LOADING,
    GET_POST,
    POST_SAVED
} from '../actions/actionTypes';

const initialState = {
    chosenPost: null,
    posts: [],
    post: null,
    isLoading: false,
    isLoaded: false
};

export const Post = (state = initialState, action) => {
    switch (action.type) {
        case POST_CREATED:
        case POST_SAVED:
            return {
                ...state,
                isLoading: false,
                post: action.payload
            };
        case POSTS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload,
                isLoading: false,
                isLoaded: true
            };
        case POST_ERROR:
            return {
                ...state,
                isLoading: false,
                posts: []
            };
        case GET_POST:
            return {
                ...state,
                isLoading: false,
                chosenPost: action.payload,
                isLoaded: true
            };
        default:
            return state;
    };
};