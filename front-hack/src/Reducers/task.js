import { GET_TASKS, ERROR_TASK } from "../Actions//types";

const initialState = {
  loading: true,
  tasks: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case ERROR_TASK:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
