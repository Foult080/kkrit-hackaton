import {
  GET_CONTACT,
  SEND_CONTACT,
  ERROR_CONTACT,
  CLEAR_CONTACT,
} from "../actions/types";

const initialState = {
  contact: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEND_CONTACT:
      return {
        ...state,
        contact: payload,
        loading: false,
      };
    case GET_CONTACT:
      return {
        ...state,
        contact: payload,
        loading: false,
      };
    case ERROR_CONTACT:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_CONTACT:
      return {
        ...state,
        constact: null,
        loading: false,
      };
    default:
      return state;
  }
}
