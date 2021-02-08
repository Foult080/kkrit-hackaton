import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/spinner";
import { getProfiles } from "../../actions/profiles";
import { Link } from "react-router-dom";

const ListStudents = ({ getProfiles, profiles: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return loading || profiles === null ? (
    <Spinner />
  ) : profiles.length === 0 ? (
    <Fragment>
      <h4 className="title my-4">Студентов пока нет</h4>
    </Fragment>
  ) : (
    <Fragment>
      <div className="container">
        <div className="col-lg-10 col-md-8 col-sm-6 mx-auto ml-auto">
          <h4 className="title">Список профилей студентов:</h4>
          <hr />
          {profiles.map((profile) => (
            <div className="card mb-2" key={profile._id}>
              <h5 className="card-header">{profile.user.name}</h5>
              <div className="card-body">
                <p>
                  <strong>Специальность:</strong> {profile.spec}
                </p>
                <p>
                  <strong>Статус:</strong> {profile.status}
                </p>
                <p>
                  <strong>Навыки: </strong>
                  {profile.skills.map((item) => (
                    <span className="tags" key={item}>
                      {item}
                    </span>
                  ))}
                </p>
                <Link
                  className="btn btn-primary"
                  to={`/profiles/${profile._id}`}
                >
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

ListStudents.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getProfiles })(ListStudents);
