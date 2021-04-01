import axios from "axios";
import { setAlert } from "./alert";
import { GET_TASKS, ERROR_TASK } from "./types";

//config for axios
const config = {
  headers: {
    "Content-type": "application/json",
  },
};

//get tasks
export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/hack/tasks");
    dispatch({ type: GET_TASKS, payload: res.data });
  } catch (err) {
    dispatch({
      type: ERROR_TASK,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add or update task
export const addTask = (values) => async (dispatch) => {
  const body = JSON.stringify(values);
  try {
    const res = await axios.post("/api/hack/tasks", body, config);
    dispatch(getTasks());
    dispatch(setAlert(res.data.msg, res.data.color));
  } catch (err) {
    dispatch({
      type: ERROR_TASK,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
