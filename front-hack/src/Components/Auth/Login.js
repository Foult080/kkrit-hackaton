import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { Button, Form, Grid, Header, Message, Icon } from "semantic-ui-react";
import { login } from "../../Actions/auth";
import { Redirect } from "react-router-dom";

const Login = ({ login, isAuth, errors }) => {
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
    return <Redirect to="/dashboard" />;
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
          {errors &&
            errors.map((item) => (
              <Message attached negative content={item.msg} />
            ))}
          <Form
            className="attached fluid segment"
            onSubmit={formik.handleSubmit}
          >
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

            <Button color="blue" size="large" fluid type="submit">
              Войти
            </Button>
          </Form>
          <Message attached="bottom" info>
            <Icon name="help" />
            Нет учетной записи?&nbsp;<a href="sigin">Зарегистрируйтесь</a>.
          </Message>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

Login.propTypes = {
  isAuth: PropTypes.bool,
  errors: PropTypes.array.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  errors: state.alert,
});

export default connect(mapStateToProps, { login })(Login);
