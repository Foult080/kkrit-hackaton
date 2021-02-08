import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/spinner";
import { getEmployer } from "../../actions/employers";
import { Link } from "react-router-dom";

const Employer = ({ match, getEmployer, employers: { loading, employer } }) => {
  useEffect(() => {
    getEmployer(match.params.id);
  }, [getEmployer, match.params.id]);

  return loading || employer === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        style={{ marginTop: "2rem" }}
        className="container col-lg-8 col-md-6 col-sm-6"
      >
        <h4 className="title">Анкета работодателя</h4>
        <hr />
        <form className="form emp-form">
          <p>
            <strong>Название организации: </strong>
            {employer.name}
          </p>
          <p>
            <strong>Email: </strong>
            {employer.email}
          </p>
          <p>
            <strong>Телефон: </strong>
            {employer.tel}
          </p>
          <p>
            <strong>Описание: </strong>
            {employer.description}
          </p>
        </form>
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

        <div className="text-center">
          <Link to="/dashboard" className="btn btn-primary mr-1">
            Назад к списку работодателей
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

Employer.propTypes = {
  getEmployer: PropTypes.func.isRequired,
  employers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employers: state.employers,
});

export default connect(mapStateToProps, { getEmployer })(Employer);
