import axios from 'axios';

import {
    GET_CHART,
    CHART_ERROR
} from './types';

export const getChartByYear = (year) => async dispatch => {
    try {
        const res = await axios.get(`/api/graph/${year}`);

        dispatch({
            type: GET_CHART,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CHART_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

