import {
    SAVE_IMAGE,
    GET_IMAGE,
    IMAGE_LOADING,
    IMAGE_DELETED,
    IMAGE_UPDATED,
    IMAGE_ERROR,
    EXPORT_IMAGE
} from '../actions/actionTypes';

const initialState = {
    chosenImage: null,
    image: null,
    isLoading: false,
    isDeleted: false,
    imageSaved: false
};

export const Image = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_LOADING:
            return {
                ...state,
                isLoading: true,
                chosenImage: null
            };
        case SAVE_IMAGE:
        case EXPORT_IMAGE:
            return {
                ...state,
                imageSaved: true
            };
        case GET_IMAGE:
            return {
                ...state,
                chosenImage: action.payload,
                isLoading: false
            };
        case IMAGE_DELETED:
            return {
                ...state,
                isDeleted: true
            };
        case IMAGE_UPDATED:
            return {
                ...state,
                image: action.payload
            };
        default:
            return state;
    }
}