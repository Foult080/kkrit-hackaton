import {
  GET_HACK,
  GET_ARCHIVE,
  ERROR_HACK,
  CLOSE_HACK,
} from "../Actions//types";

const initialState = {
  loading: true,
  hack: null,
  archive: [],
  error: {},
};

const hackReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_HACK:
      return {
        ...state,
        hack: payload,
        loading: false,
      };
    case GET_ARCHIVE:
      return {
        ...state,
        archive: payload,
        loading: false,
      };
    case ERROR_HACK:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLOSE_HACK:
      return {
        ...state,
        hack: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default hackReducer;
