import { GET_HACK, GET_ARCHIVE, ERROR_HACK } from "../Actions//types";

const initialState = {
  loading: true,
  hack: null,
  archive: [],
  error: {},
};

export default function (state = initialState, action) {
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
    default:
      return state;
  }
}
