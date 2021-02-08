import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AppLanding = () => {
  return (
    <Fragment>
      <div className="col-md-8 col-lg-12 col-sm-6">
        <div className="error-template">
          <h4>WSR KKRIT</h4>
          <p className="ex404">Раздел в разработке</p>

          <Link to="/">
            <button className="btn btn-primary ex-btn">
              <i className="fas fa-home"></i> На главную
            </button>
          </Link>
          <Link to="/dashboard">
            <Button className="btn btn-success">
              <i className="fas fa-user-circle"></i>Личный кабинет
            </Button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default AppLanding;
