import axios from "axios";
import { GET_ARCHIVE, GET_HACK, ERROR_HACK } from "./types";
import { setAlert } from "./alert";

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

//load archive of events
export const getArchive = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/hack/all");
    dispatch({ type: GET_ARCHIVE, payload: res.data });
  } catch (error) {
    const err = error.response;
    dispatch({
      type: ERROR_HACK,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

//load current hackaton
export const getCurrent = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/hack/");
    dispatch({
      type: GET_HACK,
      payload: res.data,
    });
  } catch (error) {
    const err = error.response;
    dispatch({
      type: ERROR_HACK,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

//add new hackaton
export const addHack = (values) => async (dispatch) => {
  let data = {
    name: values.name,
    period: values.period,
    tasks: [values.task1, values.task2, values.task3],
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post("/api/hack/", body, config);
    dispatch(setAlert(res.data.msg, res.data.color));
  } catch (error) {
    const err = error.response;
    dispatch({
      type: ERROR_HACK,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};
