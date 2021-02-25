import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { useFormik } from "formik";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { login } from "../../Actions/auth";
import { Redirect } from "react-router-dom";

const Login = ({login, isAuth}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values);
    },
  });

//redirect of logged in
if (isAuth) {
  return <Redirect to="/dashboard" />
}

  return (
    <Fragment>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Войти в учётную запись
          </Header>
          <Form size="large" onSubmit={formik.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                id="email"
                type="email"
                placeholder="E-mail адрес"
                onChange={formik.handleChange}
                value={formik.values.email}
                autoFocus
                required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Пароль от учетной записи"
                id="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
              />

              <Button color="blue" fluid size="large" type="submit">
                Войти
              </Button>
            </Segment>
          </Form>
          <Message>
            Нет учетной записи? <a href="/signin">Зарегистрироваться</a>
          </Message>
        </Grid.Column>
      </Grid>
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
