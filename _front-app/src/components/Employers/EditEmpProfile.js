import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMyProfile, createUpdateEmp } from "../../actions/employers";
import { Link } from "react-router-dom";
import Spinner from "../Layout/spinner";


const initialState = {
  name: "",
  tel: "",
  email: "",
  description: "",
};

const EditEmpProfile = ({
  getMyProfile,
  createUpdateEmp,
  employers: { employer, loading },
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!employer) getMyProfile();
    if (!loading && employer) {
      const profileData = { ...initialState };
      for (let key in employer) {
        if (key in profileData) profileData[key] = employer[key];
      }
      setFormData(profileData);
    }
  }, [getMyProfile, loading, employer]);


  const { name, tel, email, description } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createUpdateEmp(formData, history, employer ? true : false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        {employer === null ? (
          <h4 className="title">Заполнить анкету</h4>
        ) : (
          <h4 className="title">Редактировать профиль</h4>
        )}
      </div>
      <hr />

      <div className="col-lg-8 col-md-6 col-sm-6 mx-auto ml-auto">
        <p>Заполните поля анкеты:</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Название"
              name="name"
              value={name}
              onChange={onChange}
            />
            <small className="form-text">*Название организации</small>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Телефон"
              name="tel"
              required
              value={tel}
              onChange={onChange}
            />
            <small className="form-text">
              *Укажите номер телефона в формате +70001112233
            </small>
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={onChange}
            />
            <small className="form-text">
              *Укажите адрес электронной почты
            </small>
          </div>

          <div className="form-group">
            <textarea
              rows="4"
              className="form-control"
              placeholder="Описание"
              name="description"
              value={description}
              onChange={onChange}
            />
            <small className="form-text">
              Расскажите немного о вашей организации
            </small>
          </div>
          <div className="text-center">
            <Link to="/dashboard" className="btn btn-danger mr-1">
              Назад в профиль
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              onSubmit={onSubmit}
            >
              Сохранить
            </button>
          </div>
        </form>
        <div className="someDiv" />
      </div>
    </Fragment>
  );
};

EditEmpProfile.propTypes = {
  getMyProfile: PropTypes.func.isRequired,
  employers: PropTypes.object.isRequired,
  createUpdateEmp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employers: state.employers,
});

export default connect(mapStateToProps, { getMyProfile, createUpdateEmp })(
  EditEmpProfile
);
