import {
    CATEGORIES_LOADING,
    CATEGORIES_LOADED,
    CATEGORY_ERROR,
    CATEGORY_SAVED,
    CATEGORY_UPDATED,
    CATEGORY_LOADED,
    CATEGORY_LOADING,
    CATEGORY_DELETED
} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    isLoaded: false,
    categories: [],
    category: null,
    chosenCategory: null
};

export const Category = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case CATEGORIES_LOADED:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                categories: action.payload
            };
        case CATEGORY_ERROR:
            return {
                ...state,
                isLoaded: false,
                isLoading: false
            };
        case CATEGORY_SAVED:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                category: action.payload
            };
        case CATEGORY_LOADING:
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            };
        case CATEGORY_LOADED:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                chosenCategory: action.payload
            };
        case CATEGORY_UPDATED:
            return {
                ...state,
                category: action.payload
            };
        case CATEGORY_DELETED:
            return {
                ...state
            };
        default:
            return state;
    };
};