import {
    PROFILE_PICTURE_CHANGED,
    BACKGROUND_PICTURE_CHANGED,
    USER_UPDATED,
    USER_UPDATE_ERROR,
    PASSWORD_CHANGED
} from '../actions/actionTypes';

const initialState = {
    isChanged: null,
    user: null
};

export const Profile = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_PICTURE_CHANGED:
        case BACKGROUND_PICTURE_CHANGED:
        case PASSWORD_CHANGED:
        case USER_UPDATED:
            return {
                ...state,
                isChanged: true,
                user: action.payload
            };
        case USER_UPDATE_ERROR:
            return {
                ...state,
                isChanged: false,
                user: null
            };
        default:
            return state;
    };
};