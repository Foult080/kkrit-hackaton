import React, { Fragment } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import design from "../../img/design.svg";
import iot from "../../img/IoT.svg";
import programming from "../../img/programming.svg";
import team from "../../img/Team.svg";
import prize from "../../img/prize.svg";

const Landing = ({ auth: { isAuth, loading } }) => {
  return (
    <Fragment>
      <section className="main d-flex">
        <div className="container">
          <Carousel style={styles.carousel}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={programming}
                alt="programming slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={design} alt="design slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={iot} alt="iot slide" />
            </Carousel.Item>
          </Carousel>
          <div className="team-block" style={styles.img}>
            <img
              className="d-block w-100 img-fluid"
              src={team}
              alt="team block"
            />
          </div>
          <div className="team-block" style={styles.img}>
            <img
              className="d-block w-100 img-fluid"
              src={prize}
              alt="prize block"
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
        </div>
      </section>
    </Fragment>
  );
};

const styles = {
  carousel: {
    margin: "0 4rem 0 4rem",
  },
  img: {
    margin: "1rem 4rem 1rem 4rem",
  },
  button: {
    width: "auto",
    height: "auto",
    fontSize: "1.5rem",
    marginBottom: "2rem",
  },
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Landing);
