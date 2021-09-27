import {
    EDITOR_MODE,
    TOOL_CHANGED,
    SET_SIZE_SUCCESS,
    SET_SIZE_FAIL,
    GRID_CREATED,
    SET_DEFAULT,
    DISCARD_GRID,
    PENCOLOR_CHANGED,
    GRID_CLEARED,
    BACKGROUND_FILLED
} from '../actions/actionTypes';

const initialState = {
    isEditorOpen: false,
    tool: 'pencil',
    isSetSize: null,
    isGridCreated: null,
    cells: null,
    bgColor: null,
    penColor: '#000000',
    cols: null,
    rows: null
};

export const Editor = (state = initialState, action) => {
    switch (action.type) {
        case EDITOR_MODE:
            return {
                ...state,
                isEditorOpen: true
            };
        case TOOL_CHANGED:
            return {
                ...state,
                tool: action.payload
            };
        case SET_SIZE_SUCCESS:
            return {
                ...state,
                cols: action.payload.cols,
                rows: action.payload.rows,
                bgColor: action.payload.bgColor,
                isSetSize: true,
                isGridCreated: false
            };
        case GRID_CREATED:
            return {
                ...state,
                cells: action.payload,
                isGridCreated: true,
                isSetSize: true
            }
        case SET_SIZE_FAIL:
        case SET_DEFAULT:
            return {
                ...state,
                isSetSize: false,
                isGridCreated: false,
                isEditorOpen: false
            };
        case DISCARD_GRID:
            return {
                ...state,
                cells: null,
                cols: null,
                rows: null,
                bgColor: null,
                isEditorOpen: false
            };
        case PENCOLOR_CHANGED:
            return {
                ...state,
                penColor: action.payload
            };
        case GRID_CLEARED:
        case BACKGROUND_FILLED:
            return {
                ...state
            };
        default:
            return state;
    };
};