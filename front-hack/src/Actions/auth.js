import axios from "axios";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
} from "./types";

import setAuthToken from "../Utils/setAuthToken";
import { setAlert } from "./alert";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

//load user info
export const loadUser = () => async (dispatch) => {
  console.log("Hello");
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (values) => async (dispatch) => {
  const body = JSON.stringify(values);
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//login user
export const login = (values) => async (dispatch) => {
  console.log(values);
  const body = JSON.stringify(values);
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout user
export const logOut = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
