import {
  UPDATE_TEAM,
  GET_TEAM,
  ERROR_TEAM,
  CLEAR_TEAM,
  GET_TEAMS
} from "../actions/types";

const initialState = {
  myTeam: null,
  teams: [],
  loading: true,
  error: {},
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_TEAM:
      return {
        ...state,
        myTeam: payload,
        loading: false,
      };
    case UPDATE_TEAM:
      return {
        ...state,
        myTeam: payload,
        loading: false,
      };
    case CLEAR_TEAM:
      return {
        ...state,
        myTeam: null,
      };
    case ERROR_TEAM:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_TEAMS:
      return {
        ...state,
        teams: payload,
        loading: false
      }
    default:
      return state;
  }
}
