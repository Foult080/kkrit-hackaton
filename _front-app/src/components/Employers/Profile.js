import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/spinner";
import { getUserProfile } from "../../actions/profiles";
import { Link } from "react-router-dom";

const Profile = ({ match, getUserProfile, profiles: { loading, profile } }) => {
  useEffect(() => {
    getUserProfile(match.params.id);
  }, [getUserProfile, match.params.id]);

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="header">
        <img
          className="img-avatar rounded-circle "
          alt="avatar"
          src={profile.user.avatar}
        />
      </div>

      <div className="container col-lg-8 col-md-6 col-sm-6">
        <h4 className="title">Анкета студента: {profile.user.name}</h4>
        <hr />
        <form className="form emp-form">
          <p>
            <strong>Email: </strong>
            {profile.user.email}
          </p>
          <p>
            <strong>Телефон: </strong>
            {profile.tel}
          </p>
          {profile.github === null ? (
            <p>
              <strong>GitHub: </strong>Профиль отсутсвует
            </p>
          ) : (
            <p>
              <strong>GitHub: </strong> {profile.github}
            </p>
          )}
          <p>
            <strong>Навыки: </strong>
            {profile.skills.map((item) => (
              <span className="tags" key={item}>
                {item}
              </span>
            ))}
          </p>
          <strong>Специальность: </strong>
          {profile.spec}
          <p>
            <strong>Статус: </strong>
            {profile.status}
          </p>
        </form>
        {profile.experience.length === 0 ? (
          <h4 className="title my-4">Опыт работы отсутсвует</h4>
        ) : (
          <Fragment>
            <h4 className="title">Опыт</h4>
            <hr />
            <form className="form emp-form">
              <div className="pr-4 pl-4">
                {profile.experience.map((item) => (
                  <div className="card mb-2" key={item._id}>
                    <div className="card-body">
                      <h5>{item.company}</h5>
                      <p>{item.title}</p>
                      <p className="text-justify">
                        <strong>Описание: </strong>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </Fragment>
        )}

        <div className="text-center">
          <Link to="/dashboard" className="btn btn-primary mr-1">
            Назад к списку студентов
          </Link>
        </div>
        <div className="someDiv" />
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getUserProfile })(Profile);

/*

 {employer.vacancy.length === 0 ? (
          <h2 className="text-center">Доступных вакансии пока нет</h2>
        ) : (
          <div>
            <h2 className="text-center">Доступные вакансии</h2>
            <hr />
            <form className="form emp-form">
              <div className="pr-4 pl-4">
                {employer.vacancy.map((item) => (
                  <div className="card mb-2" key={item._id}>
                    <div className="card-body">
                      <h5>
                        <strong>Должность: </strong>
                        {item.name}
                      </h5>
                      <p>
                        <strong>Навыки: </strong>
                        {item.skills.map((el) => (
                          <span className="tags" key={el}>
                            {el}
                          </span>
                        ))}
                      </p>
                      <p>
                        <strong>Описание: </strong>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        )}

*/
