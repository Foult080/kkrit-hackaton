import {
  GET_HACK,
  GET_HACKATONS,
  CLEAR_HACK,
  HACK_ERROR,
  UPDATE_HACKS,
} from "../actions/types";

const initialState = {
  hackatons: [],
  hack: null,
  loading: true,
  error: {},
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_HACK:
      return {
        ...state,
        hack: payload,
        loading: false,
      };
    case GET_HACKATONS:
    case UPDATE_HACKS:
      return {
        ...state,
        hackatons: payload,
        loading: false,
      };
    case CLEAR_HACK:
      return {
        ...state,
        hack: null,
      };
    case HACK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
