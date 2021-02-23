import React, { createRef, Fragment } from "react";
import { useFormik } from "formik";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
                icon="user"
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

export default Login;
