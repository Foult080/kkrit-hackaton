import React from "react";
import { useFormik } from "formik";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const Signin = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="green" textAlign="center">
          Зарегистрировать учётную запись
        </Header>
        <Form size="large" onSubmit={formik.handleSubmit}>
          <Segment stacked>
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
              placeholder="Пароль от учетной записи"
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
              Нажимая на кнопку вы даёте соглашаетесь с политикой <a href="/privacy">Конфиденциальности</a>
            </p>
          </Segment>
        </Form>
        <Message>
          Есть учетная запись? <a href="/login">Войдите</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Signin;
