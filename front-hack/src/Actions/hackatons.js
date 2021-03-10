import axios from "axios";
import { GET_ARCHIVE, GET_HACK, ERROR_HACK } from "./types";

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
