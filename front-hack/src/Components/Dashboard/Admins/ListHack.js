import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrent } from "../../../Actions/hackatons";
import Spinner from "../../Layout/Spinner";
import formatDate from "../../../Utils/formatDate";
import { Link } from "react-router-dom";
import {
  Header,
  Card,
  CardDescription,
  Feed,
  Button,
  Grid,
} from "semantic-ui-react";

const ListHack = ({ getCurrent, hack: { loading, hack } }) => {
  useEffect(() => {
    getCurrent();
  }, [getCurrent]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <Header
        as="h2"
        content="Текущий конкурс"
        textAlign="center"
        color="green"
      />
      <hr />
      {hack === null ? (
        <Header
          as="h3"
          content="На данный момент конкурсов нет"
          textAlign="center"
          style={{
            fontSize: "2em",
            fontWeight: "bold",
          }}
        />
      ) : (
        <Card fluid color="green" key={hack._id}>
          <Card.Content>
            <Card.Header>Название: {hack.name}</Card.Header>
            <CardDescription>
              <p>Статус мероприятия: {hack.status}</p>
              <p>Дата проведения: {hack.period}</p>
            </CardDescription>
          </Card.Content>
          <Card.Content>
            <Card.Header>Задания:</Card.Header>
            {hack.tasks.map((element) => (
              <Feed key={element._id}>
                <Feed.Event>
                  <Feed.Content>
                    <ul>
                      <li>
                        <h4>{element.title}</h4>
                        <p>{element.description}</p>
                      </li>
                    </ul>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            ))}
          </Card.Content>
          <Card.Content
            meta={"Дата Создания: " + formatDate(hack.date)}
          ></Card.Content>
        </Card>
      )}
      <Grid textAlign="center" style={{ marginTop: "1em" }}>
        <Link to="/add-hack">
          <Button color="green" size="large">
            Добавить конкурс
          </Button>
        </Link>
      </Grid>
    </div>
  );
};

ListHack.propTypes = {
  getCurrent: PropTypes.func.isRequired,
  hack: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  hack: state.hackatons,
});

export default connect(mapState, { getCurrent })(ListHack);
