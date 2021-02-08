import axios from "axios";
import { setAlert } from "./alert";
import { SEND_CONTACT, GET_CONTACT, ERROR_CONTACT } from "./types";

export const sendContact = ({ email, title, form }) => async (dispatch) => {
  //create headers for req
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //create object
  const body = JSON.stringify({ email, title, form });
  try {
    //send data
    const res = await axios.post("/api/contact", body, config);
    dispatch({
      type: SEND_CONTACT,
      payload: res.data,
    });
    dispatch(setAlert("Спасибо!", "success"));
  } catch (err) {
    //get error
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      dispatch({
        type: ERROR_CONTACT,
      });
    }
  }
};

export const getContacts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/contact");
    dispatch({
      type: GET_CONTACT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_CONTACT,
      payload: { msg: err.response.status.text, status: err.response.status },
    });
  }
};
