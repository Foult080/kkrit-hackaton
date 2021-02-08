import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../Layout/spinner";
import NewsItem from "../News/NewsItem";
import { getLastNews } from "../../actions/news";
import { Button, Card } from "react-bootstrap";
import Career from "../../img/proud.svg";
import Card1 from "../../img/card1.svg";
import Card2 from "../../img/card2.svg";

const styles = {
  title: {
    textAlign: "center",
    marginTop: "2rem",
  },
  mainTitle: {
    fontWeight: "600",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  projects: {
    marginBottom: "2rem",
  },
  buttons: {
    textAlign: "center",
    marginBottom: "2rem",
  },
};

const Landing = ({ getLastNews, news: { posts, loading } }) => {
  useEffect(() => {
    getLastNews();
  }, [getLastNews]);

  return (
    <Fragment>
      <section className="main d-flex">
        <div className="container">
          <div className="row my-2">
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1">
              <h1 style={styles.mainTitle}>
                Открытая площадка студентов ККРИТ
              </h1>
              <h4>Твой путь к успеху</h4>
              <div className="d-lg-flex">
                <Link to="/register">
                  <Button size="lg" variant="outline-success">
                    Зарегистрироваться
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button size="lg" className="ml-1" variant="primary">
                    Войти
                  </Button>
                </Link>
              </div>
            </div>
            <div
              className="col-lg-6 order-1 order-lg-2"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img src={Career} className="img-fluid animated" alt=""></img>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div style={styles.projects} className="container">
          <h1 style={styles.title}>Наши площадки:</h1>
          <div className="row">
            <div className="col-lg-6 d-flex align-items-center align-items-stretch">
              <Card className="my-2">
                <Card.Img variant="top" src={Card1} />
                <Card.Body>
                  <Card.Title>#ККРИТ Хакатон</Card.Title>
                  <Card.Text>
                    Конкурс профессионального мастерства с возможностью начала
                    крупного стартапа. Собери свою команду и получи доступ к
                    кейсовым заданиям.
                  </Card.Text>
                  <Link to="/hack">
                    <Button variant="primary">Подробнее</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>

            <div className="col-lg-6 d-flex align-items-center align-items-stretch">
              <Card className="my-2">
                <Card.Img variant="top" src={Card2} />
                <Card.Body>
                  <Card.Title>#Работа ККРИТ</Card.Title>
                  <Card.Text>
                    Построй карьеру вместе с нами! Множество работодателей уже
                    здесь. Подай резюме, изучай вакансии и требования
                    работодателей, учавствуй в мастер классах и встречах.
                  </Card.Text>
                  <Link to="/employers">
                    <Button variant="success">Подробнее</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {loading || posts === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="news container">
            <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
              Новости площадки
            </h1>
            <hr />
            {posts.map((post) => (
              <NewsItem key={post._id} post={post} />
            ))}
            <div style={styles.buttons} className="news-buttons">
              <Link to="/news">
                <Button size="lg" variant="info">
                  Еще новости
                </Button>
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Landing.propTypes = {
  getLastNews: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  news: state.news,
});

export default connect(mapStateToProps, { getLastNews })(Landing);
