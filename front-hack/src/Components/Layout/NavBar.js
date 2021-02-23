import React, { createRef } from "react";
import { Button, Container, Menu, Icon } from "semantic-ui-react";
import logo from "./logo.png";

function NavBar() {
  return (
    <Menu stackable size="huge" fixed="top">
      <Container>
        <Menu.Item as="a" href="/">
          <img src={logo} />
          <p style={{ marginLeft: "0.5rem" }}>KKRIT-Хакатон</p>
        </Menu.Item>
        <Menu.Item as="a" href="/about">
          О проекте
        </Menu.Item>

        <Menu.Item position="right">
          <Button animated="fade" color="green" as="a" href="/signin">
            <Button.Content visible>
              <Icon name="user circle" />
              Зарегистрироваться
            </Button.Content>
            <Button.Content hidden>
              <Icon name="user plus" size="large" />
            </Button.Content>
          </Button>

          <Button
            animated="fade"
            as="a"
            href="/login"
            style={{ marginLeft: "0.5em" }}
            color="blue"
          >
            <Button.Content visible>
              <Icon name="sign-in" />
              Войти
            </Button.Content>
            <Button.Content hidden>
              <Icon name="sign in alternate" size="large" />
            </Button.Content>
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default NavBar;

/*


        <Menu.Item position="right">
          <Button as="a" inverted={true}>
            <Icon name="sign-in" />
            Log in
          </Button>
          <Button
            as="a"
            inverted={true}
            primary={false}
            style={{ marginLeft: "0.5em" }}
          >
            <Icon name="user circle" />
            Sign Up
          </Button>
        </Menu.Item>


*/
