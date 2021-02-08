import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/spinner";
import { getEmployers } from "../../actions/employers";
import { Link } from "react-router-dom";

const ListEmployers = ({ getEmployers, employers: { employers, loading } }) => {
  useEffect(() => {
    getEmployers();
  }, [getEmployers]);

  return loading || employers === null ? (
    <Spinner />
  ) : employers.length === 0 ? (
    <Fragment>
      <h2 className="title">Работодателей пока нет</h2>
    </Fragment>
  ) : (
    <Fragment>
      <div className="container">
        <h2 className="title">Список работодателей:</h2>
        <hr />
        {employers.map((employer) => (
          <div className="card mb-2" key={employer._id}>
            <h5 className="card-header">{employer.name}</h5>
            <div className="card-body">
              <h5 className="">
                Количество активных вакансий: {employer.vacancy.length}
              </h5>
              <p className="card-text text-justify">{employer.description}</p>
              <Link
                className="btn btn-primary"
                to={`/employers/${employer._id}`}
              >
                Подробнее
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

ListEmployers.propTypes = {
  getEmployers: PropTypes.func.isRequired,
  employers: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  employers: state.employers,
});

export default connect(mapStateToProps, { getEmployers })(ListEmployers);
