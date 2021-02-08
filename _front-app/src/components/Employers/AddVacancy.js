import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { addVacancy } from "../../actions/employers";
import { connect } from "react-redux";

const AddVacancy = ({ addVacancy, history }) => {
  const [formData, setFormData] = useState({
    skills: "",
    name: "",
    description: "",
  });

  const { name, skills, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addVacancy(formData, history);
  };

  return (
    <Fragment>
      <h4 className="title">Добавить вакансию</h4>
      <hr />
      <div className="col-lg-8 col-md-6 col-sm6 ml-auto mx-auto">
        <p>Заполните поля вакансии:</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Наименование"
              name="name"
              autoFocus
              required
              value={name}
              onChange={onChange}
            />
            <small className="form-text">*Укажите наименование вакансии</small>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Навыки"
              name="skills"
              required
              value={skills}
              onChange={onChange}
            />
            <small className="form-text">
              *Укажите навыки которыми должен обладать соискатель
            </small>
          </div>

          <div className="form-group">
            <textarea
              rows="4"
              type="text"
              className="form-control"
              placeholder="Описание"
              name="description"
              required
              value={description}
              onChange={onChange}
            />
            <small className="form-text">*Укажите описание вакансии</small>
          </div>
          <div className="text-center">
            <Link to="/dashboard" className="btn btn-danger mr-1">
              Назад в профиль
            </Link>
            <button type="submit" className="btn btn-primary">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddVacancy.propTypes = {
  addVacancy: PropTypes.func.isRequired,
};

export default connect(null, { addVacancy })(AddVacancy);
