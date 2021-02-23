import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

const Signin = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="green" textAlign="center">
        Войти в учётную запись
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="green" fluid size="large">
              Войти
            </Button>
          </Segment>
        </Form>
        <Message>
          Нет учетной записи? <a href="/signin">Зарегистрироваться</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Signin;
