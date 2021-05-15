import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrent, closeHack } from "../../../Actions/hackatons";
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
  Confirm,
  Message,
} from "semantic-ui-react";

const ListHack = ({
  getCurrent,
  hack: { loading, hack },
  closeHack,
  errors,
}) => {
  useEffect(() => {
    getCurrent();
  }, [getCurrent]);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div>
        <Header
          as="h2"
          content="Текущий конкурс"
          textAlign="center"
          color="green"
        />
        <hr />
        <div>
          {errors &&
            errors.map((item) => (
              <Message key={item.id} color={item.type} content={item.msg} />
            ))}
        </div>
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
          <div>
            <Confirm
              open={show}
              content="Вы действительно хотите закрыть конкурс?"
              confirmButton="Закрыть конкурс"
              cancelButton="Отмена"
              onCancel={handleShow}
              onConfirm={() => closeHack(hack._id)}
            />
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
              <Button color="blue" onClick={handleShow} size="large">
                Закрыть конкурс
              </Button>
            </Card>
          </div>
        )}
        <Grid textAlign="center" style={{ marginTop: "1em" }}>
          <Link to="/add-hack">
            <Button color="green" size="large">
              Добавить конкурс
            </Button>
          </Link>
        </Grid>
      </div>
    </div>
  );
};

ListHack.propTypes = {
  getCurrent: PropTypes.func.isRequired,
  closeHack: PropTypes.func.isRequired,
  hack: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired,
};

const mapState = (state) => ({
  hack: state.hackatons,
  errors: state.alert,
});

export default connect(mapState, { getCurrent, closeHack })(ListHack);
