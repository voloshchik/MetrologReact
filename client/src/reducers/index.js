import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import devices from './devices';
import calibrations from './calibrations';
import chart from './chart';

export default combineReducers({
    auth,
    alert,
    devices,
    calibrations,
    chart
});