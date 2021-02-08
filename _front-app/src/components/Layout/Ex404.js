import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const Ex404 = () => {
  return (
    <Fragment>
      <div className="error">
        <h1 className="title">Страница не найдена</h1>
        <p className="err404">404</p>
        <Link to="/">
          <button className="btn btn-primary mr-1">
            <i className="fas fa-home"></i> На главную
          </button>
        </Link>
        <Link to="/dashboard">
          <Button className="btn btn-success">
            <i className="fas fa-user-circle"></i> Личный кабинет
          </Button>
        </Link>
      </div>
    </Fragment>
  );
};

export default Ex404;
