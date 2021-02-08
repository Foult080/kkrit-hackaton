import axios from "axios";
import {
  GET_EMPLOYERS,
  EMPLOYER_ERROR,
  GET_EMPLOYER,
  UPDATE_EMPLOYER,
} from "./types";
import { setAlert } from "./alert";

export const getEmployers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/employers/all");
    dispatch({
      type: GET_EMPLOYERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getMyProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/employers/me");
    dispatch({
      type: GET_EMPLOYER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getEmployer = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/employers/${id}`);
    dispatch({
      type: GET_EMPLOYER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getRandomEmployers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/employers");
    dispatch({
      type: GET_EMPLOYERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMPLOYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createUpdateEmp = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const body = JSON.stringify(formData);
    const res = await axios.post("/api/employers", body, config);


    dispatch({
      type: GET_EMPLOYER,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit ? "Анкета работодателя обновлена" : "Анкета работодателя создана",
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
      type: EMPLOYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addVacancy = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const body = JSON.stringify(formData);
    const res = await axios.put("/api/employers/vacancy", body, config);

    dispatch({
      type: UPDATE_EMPLOYER,
      payload: res.data,
    });

    dispatch(setAlert("Анкета обновлёна", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: EMPLOYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteVac = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/employers/vacancy/${id}`);
    dispatch({
      type: UPDATE_EMPLOYER,
      payload: res.data,
    });

    dispatch(setAlert("Запись удалена", "success"));
  } catch (err) {
    dispatch({
      type: EMPLOYER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
