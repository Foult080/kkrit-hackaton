import axios from "axios";
import { GET_TEAM, UPDATE_TEAM, ERROR_TEAM, DELETE_TEAM } from "./types";

//get my team
export const getMyTeam = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/hack/teams/me");
    dispatch({
      type: GET_TEAM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_TEAM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
