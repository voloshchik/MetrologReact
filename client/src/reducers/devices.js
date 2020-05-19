import {
  GET_DEVICES,
  DEVICES_ERROR,
  GET_DEVICE,
  DELETE_DEVICE,
  UPDATE_DEVICE,
} from "../actions/types";

const initialState = {
  devices: [],
  device: {},
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DEVICES:
      return {
        ...state,
        devices: payload,
        loading: false,
      };
    case GET_DEVICE:
      return {
        ...state,
        device: payload,
        loading: false,
      };
    case UPDATE_DEVICE:
      const id = payload.id;
      const name = payload.formData.name;
      
      return {
        ...state,
        devices: state.devices.map((device)=>{
            if(device._id===payload.id){
                device.name=payload.formData.name
                device.type=payload.formData.type
                device.number=payload.formData.number
                device.period=payload.formData.period
            }
            return device

        }),
        loading: false,
      };
    case DELETE_DEVICE:
      return {
        ...state,
        devices: state.devices.filter((device) => device._id != payload),
        loading: false,
      };
    case DEVICES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
