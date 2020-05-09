import {
    GET_CALIBRATIONS,
    CALIBRATIONS_ERROR
} from '../actions/types';

const initialState = {
    calibrations: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_CALIBRATIONS:
            return {
                ...state,
                calibrations: payload,
                loading: false
            };
        case CALIBRATIONS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}