import axios from 'axios';

import {
    GET_CALIBRATIONS,
    CALIBRATIONS_ERROR,
    DELETE_CALIBRATION
} from './types';

//Get current user calibrations
export const getCurrentCalibrations = () => async dispatch => {
    try {
        const res = await axios.get('/api/calibrations/me');

        /* dispatch({
            type: GET_CALIBRATIONS,
            payload: res.data
        }); */
    } catch (err) {
        dispatch({
            type: CALIBRATIONS_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}
 