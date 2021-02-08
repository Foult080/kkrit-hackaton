import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/spinner";
import { Link } from "react-router-dom";
import { createUpdateTeam, getTeam, getHack } from "../../actions/hack";

const initialState = {
  name: "",
  hack: "",
  case_id: "",
  link: "",
};

const EditTeam = ({
  getTeam,
  createUpdateTeam,
  getHack,
  team: { loading, myTeam },
  hack: { hack },
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    if (!hack) getHack();
    if (!myTeam) getTeam();
    if (!loading && myTeam) {
      setFormData({
        hack: hack._id,
        case_id: myTeam.hackaton.teamCase._id,
        link: myTeam.hackaton.link,
        name: myTeam.name,
      });
    }
    if (hack && !myTeam)
      setFormData({ case_id: hack.cases[0]._id, hack: hack._id });
  }, [getTeam, myTeam, loading, getHack, hack]);

  const { name, link, case_id } = formData;

  const OnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    createUpdateTeam(formData, history, myTeam ? true : false);
  };

  return loading && hack === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        {myTeam === null ? (
          <h4 style={styles.title}>Заполнить информацию о команде</h4>
        ) : (
          <h4 style={styles.title}>Редактировать информацию о команде</h4>
        )}
        <hr />
        <div className="col-lg-8 col-md-8 col-sm-8 mx-auto ml-auto">
          <p>Заполните поля анкеты для участия в Хакатоне: "{hack.name}"</p>
          <form className="form" onSubmit={OnSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Название команды"
                name="name"
                required
                value={name}
                onChange={OnChange}
              />
              <small className="form-text">*Укажите название команды</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">
                Выберете задачу:
              </label>
              <select
                className="form-control"
                id="exampleFormControlSelect1"
                name="case_id"
                value={case_id}
                onChange={OnChange}
              >
                {hack.cases.map((el) => (
                  <option key={el._id} value={el._id}>
                    {el.name}
                  </option>
                ))}
              </select>
              <small className="form-text">*Выберете задачу на хакатон</small>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ссылка на папку"
                name="link"
                value={link}
                onChange={OnChange}
              />
              <small className="form-text">
                *НЕОБЯЗАТЕЛЬНО Укажите ссылку для решения кейса(Google Диск,
                Dropbox, Yandex Диск)
              </small>
            </div>

            <div className="news-buttons">
              <Link to="/dashboard" className="btn btn-danger mr-1">
                Назад в профиль
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={OnSubmit}
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const styles = {
  title: {
    textAlign: "center",
    marginTop: "3rem",
    fontSize: "2rem",
  },
};

EditTeam.propTypes = {
  getTeam: PropTypes.func.isRequired,
  getHack: PropTypes.func.isRequired,
  createUpdateTeam: PropTypes.func.isRequired,
  hack: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  team: state.team,
  hack: state.hack,
});

export default connect(mapStateToProps, { getTeam, createUpdateTeam, getHack })(
  EditTeam
);
