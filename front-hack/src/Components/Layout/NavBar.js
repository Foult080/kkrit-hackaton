import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../../Actions/auth";
import { Button, Container, Menu, Icon } from "semantic-ui-react";
import logo from "./imgs/logo.png";

function NavBar({ auth: { loading, isAuth }, logOut }) {
  const authLinks = (
    <Fragment>
      <Menu.Item position="right">
        <Button animated="fade" color="green" as="a" href="/dashboard">
          <Button.Content visible>
            <Icon name="user circle" />
            Личный Кабинет
          </Button.Content>
          <Button.Content hidden>
            <Icon name="user circle" size="large" />
          </Button.Content>
        </Button>

        <Button
          animated="fade"
          as="a"
          href="/login"
          style={{ marginLeft: "0.5em" }}
          color="red"
          onClick={logOut}
        >
          <Button.Content visible>
            <Icon name="sign-out" />
            Выйти
          </Button.Content>
          <Button.Content hidden>
            <Icon name="sign-out" size="large" />
          </Button.Content>
        </Button>
      </Menu.Item>
    </Fragment>
  );

  const guesLinks = (
    <Fragment>
      <Menu.Item position="right">
        <Button animated="fade" color="green" as="a" href="/signin">
          <Button.Content visible>
            <Icon name="user circle" />
            Зарегистрироваться
          </Button.Content>
          <Button.Content hidden>
            <Icon name="user circle" size="large" />
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
    </Fragment>
  );

  return (
    <Menu stackable size="huge" fixed="top">
      <Container>
        <Menu.Item as="a" href="/">
          <img src={logo} />
          <p style={{ marginLeft: "0.5rem", fontWeight: "600" }}>
            KKRIT-Хакатон
          </p>
        </Menu.Item>
        <Menu.Item as="a" href="/about">
          О проекте
        </Menu.Item>
        {!loading && isAuth ? authLinks : guesLinks}
      </Container>
    </Menu>
  );
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(NavBar);

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
