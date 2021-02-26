import {
  UPDATE_TEAM,
  GET_TEAM,
  DELETE_TEAM,
  ERROR_TEAM,
} from "../Actions/types";

const initialState = {
  loading: true,
  team: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TEAM:
    case UPDATE_TEAM:
      return {
        ...state,
        team: payload,
        loading: false,
      };
    case ERROR_TEAM:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_TEAM:
      return {
        ...state,
        team: null,
      };
    default:
      return state;
  }
}
