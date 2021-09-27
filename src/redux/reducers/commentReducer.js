import {
    COMMENT_ERROR,
    COMMENT_ADDED,
    COMMENTS_LOADED,
    COMMENTS_LOADING
} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isLoaded: false,
    comments: [],
    comment: null
};

export const Comment = (state = initialState, action) => {
    switch (action.type) {
        case COMMENTS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case COMMENTS_LOADED:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                comments: action.payload
            };
        case COMMENT_ADDED:
            return {
                ...state,
                comment: action.payload
            };
        case COMMENT_ERROR:
            return {
                ...state,
                isLoaded: false,
                isLoading: false
            };
        default:
            return state;
    }
}