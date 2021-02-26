import React from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../Actions/auth";
import { Button, Form, Grid, Header, Message, Icon } from "semantic-ui-react";

const Signin = ({ errors, register }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      group: "",
      password: "",
      password2: "",
    },
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="green" textAlign="center">
          Зарегистрировать учётную запись
        </Header>
        {errors &&
          errors.map((item) => (
            <Message attached negative content={item.msg} />
          ))}
        <Form className="attached fluid segment" onSubmit={formik.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              id="name"
              placeholder="Укажите имя"
              onChange={formik.handleChange}
              value={formik.values.name}
              autoFocus
              required
            />
            <Form.Input
              fluid
              icon="university"
              iconPosition="left"
              id="group"
              placeholder="Укажите группу"
              onChange={formik.handleChange}
              value={formik.values.group}
              required
            />
          </Form.Group>
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            id="email"
            type="email"
            placeholder="E-mail адрес"
            onChange={formik.handleChange}
            value={formik.values.email}
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
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Повторите пароль от учетной записи"
            id="password2"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password2}
            required
          />
          <Button color="green" fluid size="large" type="submit">
            Зарегистрироваться
          </Button>
          <p>
            Нажимая на кнопку вы даёте соглашаетесь с политикой{" "}
            <a href="/privacy">Конфиденциальности</a>
          </p>
        </Form>
        <Message attached="bottom" color="green">
          <Icon name="help" />
          Уже зарегистрированы?&nbsp;<a color="green" href="/login">Войдите</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

Signin.propTypes = {
  errors: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  errors: state.alert,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { register })(Signin);