import React, { useEffect } from "react";
import PropTypes from "prop-types/";
import { connect } from "react-redux";
import { getArchive } from "../../Actions/hackatons";
import Spinner from "../Layout/Spinner";
import formatDate from "../../Utils/formatDate";
import {
  CardDescription,
  Container,
  Feed,
  Card,
  Header,
} from "semantic-ui-react";

const ArchiveHack = ({ getArchive, archive: { loading, archive } }) => {
  useEffect(() => {
    getArchive();
  }, [getArchive]);

  return loading && archive === null ? (
    <Spinner />
  ) : (
    <Container>
      <Header
        as="h2"
        content="Архив конкурсов"
        textAlign="center"
        color="green"
      />
      <hr />
      {archive.map((item) => (
        <Card fluid color="green" key={item._id}>
          <Card.Content>
            <Card.Header>Название: {item.name}</Card.Header>
            <CardDescription>
              <p>Статус мероприятия: {item.status}</p>
              <p>Дата проведения: {item.period}</p>
            </CardDescription>
          </Card.Content>
          <Card.Content>
            <Card.Header>Задания:</Card.Header>
            {item.tasks.map((element) => (
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
            meta={"Дата Создания: " + formatDate(item.date)}
          ></Card.Content>
        </Card>
      ))}
    </Container>
  );
};
ArchiveHack.propTypes = {
  getArchive: PropTypes.func.isRequired,
  archive: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  archive: state.hackatons,
});

export default connect(mapState, { getArchive })(ArchiveHack);
