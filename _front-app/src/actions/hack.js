import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_HACKATONS,
  HACK_ERROR,
  GET_HACK,
  GET_TEAM,
  UPDATE_TEAM,
  ERROR_TEAM,
  CLEAR_TEAM,
  UPDATE_HACKS,
  GET_TEAMS
} from "./types";

//get all hackatons
export const getHackatons = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/hack/all");
    dispatch({
      type: GET_HACKATONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add hack
export const addHackaton = (name, cases) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const body = JSON.stringify({ name: name, cases });
    const res = await axios.post("/api/hack", body, config);
    dispatch({
      type: UPDATE_HACKS,
      payload: res.data,
    });
    dispatch(setAlert("Хакатон добавлен", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ERROR_TEAM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get my team
export const getTeam = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/hack/team/me");
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

//get hackaton info
export const getHack = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/hack/");
    dispatch({
      type: GET_HACK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add teamate for hackaton
export const addTeamMate = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const body = JSON.stringify({ email: email });
    const res = await axios.put("/api/hack/team/add", body, config);
    dispatch({
      type: UPDATE_TEAM,
      payload: res.data,
    });
    dispatch(setAlert("Пользователь добавлен", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ERROR_TEAM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete teammate 
export const deleteTeamMate = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/hack/team/team-mate/${id}`);
    dispatch({
      type: UPDATE_TEAM,
      payload: res.data,
    });
    dispatch(setAlert("Запись удалена", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ERROR_TEAM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete team
export const deleteTeam = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/hack/team/${id}`);
    dispatch({
      type: CLEAR_TEAM,
      payload: res.data,
    });
    dispatch(setAlert("Запись удалена", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ERROR_TEAM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete me from team
export const deleteFromTeam = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/hack/team/del-from-team/${id}`);
    dispatch({
      type: CLEAR_TEAM,
      payload: res.data,
    });
    dispatch(setAlert("Запись удалена", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ERROR_TEAM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create update team info
export const createUpdateTeam = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const body = JSON.stringify(formData);
    const res = await axios.post("/api/hack/team", body, config);
    dispatch({
      type: UPDATE_TEAM,
      payload: res.data,
    });
    dispatch(
      setAlert(
        edit ? "Анкета команды обновлена" : "Анкета команды создана",
        "success"
      )
    );
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ERROR_TEAM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get teams for admin panel
export const getTeams = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/hack/team");
    dispatch({
      type: GET_TEAMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HACK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}