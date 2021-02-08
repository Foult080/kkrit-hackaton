import React, { Fragment, useState } from "react";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

const Login = ({ login, isAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const OnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const OnSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  //redirect if logged in
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="text-center" style={{marginTop: "10%"}}>
        <form className="form-signin" onSubmit={OnSubmit}>
          <h1 className="mb-3">Войти</h1>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email адрес"
            required
            autoFocus
            name="email"
            value={email}
            onChange={OnChange}
          />
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Пароль"
            required
            name="password"
            value={password}
            onChange={OnChange}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Войти
          </button>
          <p className="mb-3 text-muted">
            Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
          </p>
          <p className="mt-4 mb-3 text-muted">&copy; Open-Kras-KRIT 2020</p>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  isAuth: PropTypes.bool,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
