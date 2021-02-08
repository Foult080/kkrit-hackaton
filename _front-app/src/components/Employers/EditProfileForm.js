import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profiles";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { createProfile } from "../../actions/profiles";

const intitilaState = {
  user: "",
  tel: "",
  github: "",
  spec: "",
  status: "",
  skills: "",
  desc: "",
};

const EditProfileForm = ({
  getProfile,
  createProfile,
  profiles: { profile, loading },
  history,
}) => {
  const [formData, setFormData] = useState(intitilaState);

  useEffect(() => {
    if (!profile) getProfile(history);
    if (!loading && profile) {
      const profileData = { ...intitilaState };
      for (let key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(",");
      setFormData(profileData);
    }
  }, [getProfile, loading, profile, history]);

  const { tel, github, spec, status, skills, desc } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section style={{ marginBottom: "2rem" }}>
        <div className="container">
          {profile === null ? (
            <h4 className="title">Создать профиль</h4>
          ) : (
            <h4 className="title">Редактировать профиль</h4>
          )}
          <hr />
          <div className="col-lg-8 col-md-6 col-sm-6 mx-auto ml-auto">
            <p>Заполните поля акеты:</p>
            <form className="form" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  max={12}
                  min={11}
                  className="form-control"
                  placeholder="Телефон"
                  name="tel"
                  autoFocus
                  required
                  value={tel}
                  onChange={onChange}
                />
                <small className="form-text">
                  *номер телефона в формате +70001112233
                </small>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Имя пользователя GitHub"
                  name="github"
                  value={github}
                  onChange={onChange}
                />
                <small className="form-text">
                  *название профиля на GitHub(пр: @SomeName)
                </small>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Специальность"
                  required
                  name="spec"
                  value={spec}
                  onChange={onChange}
                />
                <small className="form-text">
                  Укажите название специальности
                </small>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ваш статус"
                  name="status"
                  value={status}
                  onChange={onChange}
                />
                <small className="form-text">
                  Укажите ваш статус(пр: Студент, Выпускник и тд)
                </small>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Навыки"
                  required
                  name="skills"
                  value={skills}
                  onChange={onChange}
                />
                <small className="form-text">
                  *Через запятую перечислите ваши навыки (пр: C#, Entity
                  Framework, MySQL, PostgreSQL)
                </small>
              </div>

              <div className="form-group">
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="О себе"
                  name="desc"
                  value={desc}
                  onChange={onChange}
                />
                <small className="form-text">Расскажите немного о себе</small>
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
          </div>
        </div>
      </section>
    </Fragment>
  );
};

EditProfileForm.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
};

const mapStateToPtops = (state) => ({
  auth: state.auth,
  profiles: state.profiles,
});

export default connect(mapStateToPtops, { getProfile, createProfile })(
  EditProfileForm
);
