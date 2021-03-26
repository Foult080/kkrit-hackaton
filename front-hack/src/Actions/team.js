import axios from "axios";
import { setAlert } from "./alert";
import { GET_TEAM, UPDATE_TEAM, ERROR_TEAM, DELETE_TEAM } from "./types";

//config for axios
const config = {
  headers: {
    "Content-type": "application/json",
  },
};

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

//create or update team
export const createTeam = (values) => async (dispatch) => {
  const body = JSON.stringify(values);
  console.log(body);
  try {
    const res = await axios.post("/api/hack/teams/", body, config);
    dispatch({
      type: UPDATE_TEAM,
      payload: res.data,
    });
    dispatch(getMyTeam());
  } catch (err) {
    dispatch({
      type: ERROR_TEAM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete team
export const deleteTeam = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/hack/teams/${id}`);
    dispatch({ type: DELETE_TEAM });
  } catch (err) {
    dispatch({
      type: ERROR_TEAM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add new team-mate
export const addTeamMate = (values) => async (dispatch) => {
  const body = JSON.stringify(values);
  console.log(values, body);
  try {
    const res = await axios.put("/api/hack/teams/add", body, config);
    dispatch(setAlert(res.data.msg, res.data.color));
    dispatch(getMyTeam());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.data.color));
  }
};

export const deleteTeamMate = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/hack/teams/mate/${id}`);
    dispatch(setAlert(res.data.msg, res.data.color));
    dispatch(getMyTeam());
  } catch (err) {
    dispatch({
      type: ERROR_TEAM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
