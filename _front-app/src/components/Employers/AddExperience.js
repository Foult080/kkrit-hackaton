import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profiles";
import { connect } from "react-redux";

const AddExperinece = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    desc: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { company, title, desc } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <Fragment>
      <div className="container" style={{marginTop: "2rem"}}>
        <h4 className="title">Добавить опыт</h4>
        <hr />

        <div className="col-lg-8 col-md-6 col-sm-6 mx-auto ml-auto">
          <p>Заполните поля анкеты:</p>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Наименование"
                name="company"
                autoFocus
                required
                value={company}
                onChange={onChange}
              />
              <small className="form-text">
                *Укажите название мероприятия, или организации где вы принимали
                участие(конкурс, олимпиады, практики и тд)
              </small>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Роль"
                name="title"
                required
                value={title}
                onChange={onChange}
              />
              <small className="form-text">*Ваша роль как участника</small>
            </div>

            <div className="form-group">
              <textarea
                rows="4"
                type="text"
                className="form-control"
                placeholder="Наименование"
                name="desc"
                required
                value={desc}
                onChange={onChange}
              />
              <small className="form-text">
                *Опишите результат вашего участия.
              </small>
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
        <div className="someDiv" />
      </div>
    </Fragment>
  );
};

AddExperinece.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperinece);
