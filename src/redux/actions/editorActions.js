import { returnErrors } from './errorActions';
import axios from 'axios';

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
} from './actionTypes';

import Cell from '../../components/editor/Cell';

// Open the Editor
export const openEditor = () => {
    return {
        type: EDITOR_MODE
    };
};

/*//Export the image to device
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
};*/

// Change tool in Editor: pencil, eraser, pipette
export const changeTool = (toolName) => {
    return {
        type: TOOL_CHANGED,
        payload: toolName
    };
};

export const setSize = ({ cols, rows }, bgColor) => dispatch => {

    if (!cols || !rows) {
        dispatch(returnErrors('Please, fill all fields.', 'SET_SIZE_FAIL', 'SET_SIZE_FAIL')
        );
        dispatch({
            type: SET_SIZE_FAIL
        });
    } else {
        dispatch({
            type: SET_SIZE_SUCCESS,
            payload: { cols, rows, bgColor }
        });
    };
    /*.catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'SET_SIZE_FAIL')
        );
        dispatch({
            type: SET_SIZE_FAIL
        });
    });*/
};



export const createGrid = (cols, rows) => {
    let cells = [];
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            let cell = new Cell(i, j);
            cells.push(cell);
        }
    }

    return {
        type: GRID_CREATED,
        payload: cells
    };
};

export const setDefault = () => {
    return {
        type: SET_DEFAULT
    };
};

export const discardGrid = () => {
    return {
        type: DISCARD_GRID
    };
};

export const penColorChanged = (penColor) => {
    return {
        type: PENCOLOR_CHANGED,
        payload: penColor
    };
};

export const clearGrid = (ref, bgColor) => {

    ref.children[0].children.forEach(elem => {
        elem.setAttrs({
            fill: bgColor
        });
        elem.to({
            fill: bgColor
        });
    });

    return {
        type: GRID_CLEARED
    };
}

export const fillSameColor = (ref, targetColor, penColor) => {

    ref.children.forEach(elem => {
        if (elem.attrs.fill === targetColor) {
            elem.setAttrs({
                fill: penColor
            });
            elem.to({
                fill: penColor
            });
        }
    });

    return {
        type: BACKGROUND_FILLED
    };
};