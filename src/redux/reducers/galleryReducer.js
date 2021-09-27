import {
    GALLERY_LOADING,
    GALLERY_LOADED,
    GALLERY_ERROR
} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isLoaded: false,
    images: []
};

export const Gallery = (state = initialState, action) => {
    switch (action.type) {
        case GALLERY_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case GALLERY_LOADED:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                images: action.payload
            };
        case GALLERY_ERROR:
            return {
                ...state,
                isLoaded: false,
                isLoading: false
            };
        default:
            return state;
    }
}