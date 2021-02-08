import axios from "axios";
import { GET_NEWS, GET_NEWS_EL, NEWS_ERR, SEND_NEWS} from "./types";
import { setAlert } from "./alert";

export const getNews = () => async dispatch => {
    try {
        const res = await axios.get('/api/news');
        dispatch({
            type: GET_NEWS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: NEWS_ERR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

export const getLastNews = () => async dispatch => {
  try {
    const res = await axios.get('/api/news/last-news');
    dispatch({
        type: GET_NEWS,
        payload: res.data
    });
} catch (err) {
    dispatch({
        type: NEWS_ERR,
        payload: {msg: err.response.statusText, status: err.response.status}
    });
}
}

export const getNewsEl = id => async dispatch => {
    try {
        const res = await axios.get(`/api/news/${id}`);
        dispatch({
            type: GET_NEWS_EL,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: NEWS_ERR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

export const sendNews = ({ title, desc }) => async (dispatch) => {
    //create headers for req
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    //create object
    const body = JSON.stringify({ title, desc });
    try {
      //send data
      const res = await axios.post("/api/news", body, config);
      dispatch({
        type: SEND_NEWS,
        payload: res.data,
      });
      dispatch(setAlert("Новость добавлена!", "success"));
    } catch (err) {
      //get error
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        dispatch({
          type: NEWS_ERR,
        });
      }
    }
  };