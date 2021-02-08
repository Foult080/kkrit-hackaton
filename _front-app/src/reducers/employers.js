import {
  GET_EMPLOYERS,
  GET_EMPLOYER,
  CLEAR_EMPLOYER,
  UPDATE_EMPLOYER,
  EMPLOYER_ERROR,
} from "../actions/types";

const initialState = {
  employers: [],
  employer: null,
  loading: true,
  error: {},
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_EMPLOYER:
    case UPDATE_EMPLOYER:
      return {
        ...state,
        employer: payload,
        loading: false,
      };
    case GET_EMPLOYERS:
      return {
        ...state,
        employers: payload,
        loading: false,
      };
    case CLEAR_EMPLOYER:
      return {
        ...state,
        employer: null,
      };
    case EMPLOYER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
