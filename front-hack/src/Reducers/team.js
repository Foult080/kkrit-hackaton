import {
  UPDATE_TEAM,
  GET_TEAM,
  DELETE_TEAM,
  ERROR_TEAM,
  GET_TEAMS,
} from "../Actions/types";

const initialState = {
  loading: true,
  team: null,
  teams: [],
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
    case GET_TEAMS:
      return {
        ...state,
        teams: payload,
        loading: false,
      };
    default:
      return state;
  }
}
