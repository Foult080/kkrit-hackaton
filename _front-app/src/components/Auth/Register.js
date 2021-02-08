import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";

const Register = ({ setAlert, register, isAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "student",
  });

  const { name, email, password, password2, role } = formData;

  const OnChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const OnSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Пароли не совпадают", "danger");
    } else {
      register({ name, email, password, role });
    }
  };

  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <Fragment>
        <div className="text-center" style={{ marginTop: "8%" }}>
          <h1>Зарегистрироваться</h1>
          <form style={styles.form} onSubmit={OnSubmit}>
            <input
              id="inputName"
              className="form-control"
              placeholder="Имя пользователя"
              required
              autoFocus
              name="name"
              value={name}
              onChange={OnChange}
            />
            <input
              type="email"
              id="inputEmail"
              className="form-control my-1"
              placeholder="Email адрес"
              required
              name="email"
              value={email}
              onChange={OnChange}
            />
            <input
              type="password"
              id="inputPassword"
              className="form-control my-1"
              placeholder="Пароль"
              required
              name="password"
              value={password}
              onChange={OnChange}
            />
            <input
              type="password"
              id="inputPassword2"
              className="form-control my-1"
              placeholder="Повторите пароль"
              required
              name="password2"
              value={password2}
              onChange={OnChange}
            />
            <select
              className="form-control my-1"
              id="exampleFormControlSelect1"
              name="role"
              value={role}
              onChange={OnChange}
            >
              <option value="student">Студент</option>
              <option value="employer">Работодатель</option>
            </select>
            <button className="btn btn-primary btn-block my-2" type="submit">
              Продолжить
            </button>
            <small className="form-text">
              Нажимая на кнопку вы даёте согласие, на обработку персональных
              данных и соглашаетесь с{" "}
              <a href="/privacy">политикой конфиденциальности</a>
            </small>
            <p className="mb-3 mt-2 text-muted">
              Уже есть аккаунт? <Link to="/signin">Войдите</Link>
            </p>
            <p className="mt-4 mb-3 text-muted">&copy; Open-Kras-KRIT 2020</p>
          </form>
        </div>
      </Fragment>
    </Fragment>
  );
};

const styles = {
  form: {
    width: "100%",
    maxWidth: "330px",
    position: "relative",
    boxSizing: "border-box",
    height: "auto",
    padding: "10px",
    fontSize: "16px",
    margin: "0 auto",
  },
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
