import {
    GET_CHART,
    CHART_ERROR
} from '../actions/types';

const initialState = {
    chart: [],
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_CHART:
            return {
                ...state,
                chart: payload,
                loading: false
            };
        case CHART_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default: 
            return state;
    }
}