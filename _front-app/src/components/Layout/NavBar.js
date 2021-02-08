import React, { Fragment } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../../img/logo.png";


const NavBar = ({ auth: { isAuth, loading }, logout }) => {
  const authLinks = (
    <Nav className="ml-auto">
      <Nav.Link href="/contact-form" className="mr-sm-2">
        Обратная связь
      </Nav.Link>
      <Button href="/dashboard" variant="success" className="mr-sm-2">
        <i className="fas fa-user-circle mr-1"></i>Личный кабинет
      </Button>
      <Button onClick={logout} variant="danger" className="mr-sm-2">
        <i className="fas fa-sign-out-alt mr-1" />
        Выйти
      </Button>
    </Nav>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <Nav.Link href="/contact-form" className="nav-el">
        Обратная связь
      </Nav.Link>
      <div>
        <Button href="/register" variant="success" className="mr-sm-2">
          <i className="fas fa-user-circle mr-1"></i>Зарегистрироваться
        </Button>
        <Button href="/signin" variant="primary" className="mr-sm-2">
          <i className="fas fa-sign-in-alt mr-1"></i> Войти
        </Button>
      </div>
    </Nav>
  );
  return (
    <Fragment>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        sticky="top"
      >
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Открытая площадка ККРИТ
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {!loading && <Fragment>{isAuth ? authLinks : guestLinks}</Fragment>}
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
