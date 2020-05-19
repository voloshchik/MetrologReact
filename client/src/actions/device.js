import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_DEVICES,
  DEVICES_ERROR,
  GET_DEVICE,
  DELETE_DEVICE,
  UPDATE_DEVICE,
} from "./types";

// Get current user devices
export const getCurrentDevices = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/devices/my");

    dispatch({
      type: GET_DEVICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DEVICES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add new device
export const addNewDevice = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/devices", formData, config);

    dispatch(setAlert("Device added successfully", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: DEVICES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Device By Id
export const getDeviceById = (device_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/device/${device_id}`);
    dispatch({
      type: GET_DEVICE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DEVICES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Put calibration to device by id
export const addNewCalibration = (device_id, formData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(
      `/api/devices/${device_id}/check`,
      formData,
      config
    );

    dispatch(setAlert("Device calibration added successfully", "success"));

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: DEVICES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//Post update Device by id
export const updateDevice = (device_id, formData, history) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("formData", formData);
    dispatch({ type: UPDATE_DEVICE, payload: { formData, id: device_id } });
    const res = await axios.post(`/api/devices/${device_id}`, formData, config);

    dispatch(setAlert("Device update successfully", "success"));

    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: DEVICES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete device By Id
export const deleteDevice = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/devices/${id}`);

    dispatch({
      type: DELETE_DEVICE,
      payload: id,
    });

    dispatch(setAlert("Device Removed", "success"));
  } catch (err) {
    dispatch({
      type: DEVICES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
