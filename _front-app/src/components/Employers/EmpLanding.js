import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import emp1 from "../../img/emp1.svg";
import emp2 from "../../img/emp2.svg";
import emp3 from "../../img/emp3.svg";

const EmpLanding = ({ auth: { isAuth, loading } }) => {
  return (
    <Fragment>
      <section className="main container">
        <div className="emp1" style={styles.img}>
          <img
            className="d-block w-100 img-fluid"
            src={emp1}
            alt="firt slide of employers"
          />
        </div>
        <div className="emp2" style={styles.img}>
          <img
            className="d-block w-100 img-fluid"
            src={emp2}
            alt="second slide of employers"
          />
        </div>
        <div className="emp3" style={styles.img}>
          <img
            className="d-block w-100 img-fluid"
            src={emp3}
            alt="third slide of employers"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              {!loading && (
                <Fragment>
                  {isAuth ? (
                    <Link to="/dashboard">
                      <Button
                        variant="outline-success"
                        size="lg"
                        style={styles.button}
                      >
                        Перейти в личный кабинет
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/register">
                      <Button
                        variant="outline-primary"
                        size="lg"
                        style={styles.button}
                      >
                        Зарегистрироваться
                      </Button>
                    </Link>
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const styles = {
  img: {
    margin: "0rem 4rem 0rem 4rem",
  },
  button: {
    width: "auto",
    height: "auto",
    fontSize: "1.5rem",
    marginBottom: "2rem",
  },
};

EmpLanding.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(EmpLanding);
