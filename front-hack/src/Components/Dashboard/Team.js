import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Header,
  Card,
  Feed,
  Container,
  Button,
  Grid,
  GridColumn,
  Segment,
  Confirm,
  Message,
} from "semantic-ui-react";
import { getMyTeam, deleteTeam, deleteTeamMate } from "../../Actions/team";
import formatDate from "../../Utils/formatDate";
import Spinner from "../Layout/Spinner";
import ModalAdd from "./ModalAdd";

const Team = ({
  deleteTeam,
  deleteTeamMate,
  getMyTeam,
  team: { loading, team },
  errors,
}) => {
  useEffect(() => {
    getMyTeam();
  }, [getMyTeam]);

  //init state for confirm delete team
  const [showTeam, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleConfirmTeam = () => {
    setShow(false);
    deleteTeam(team._id);
  };
  const handleShow = () => setShow(true);

  //init state for add teammate
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div style={{ height: "100vh" }}>
      <Confirm
        open={showTeam}
        content="Вы действительно хотите удалить команду?"
        confirmButton="Удалить команду"
        cancelButton="Отмена"
        onCancel={handleClose}
        onConfirm={handleConfirmTeam}
      />

      <Container>
        <Header
          as="h2"
          content="Карточка команды"
          textAlign="center"
          color="green"
        />
        <hr />
        {team === null ? (
          <Segment basic textAlign="center">
            <Header
              as="h3"
              content="Вы не в команде"
              style={{
                fontSize: "2em",
                fontWeight: "bold",
              }}
            />
            <Link to="/create-team">
              <Button
                color="blue"
                size="large"
                icon="id card"
                labelPosition="left"
                content="Создать команду"
              />
            </Link>
          </Segment>
        ) : (
          <div>
            {errors &&
              errors.map((item) => (
                <Message key={item.id} color={item.type} content={item.msg} />
              ))}

            <ModalAdd show={showModal} id={team._id} close={handleCloseModal} />

            <Card fluid color="green">
              <Card.Content>
                <Card.Header>Название команды: {team.name}</Card.Header>
              </Card.Content>
              {team.hackaton === null ? (
                <Card.Content>
                  <Card.Header>Команда не учавствует в конкурсе</Card.Header>
                </Card.Content>
              ) : (
                <Card.Content>
                  <Card.Header>Информация о конкурсе:</Card.Header>
                  <h4>{team.hackaton.hack.name}</h4>
                  <p>Период проведения: {team.hackaton.hack.period}</p>
                  <h4>Выбранное задание: {team.hackaton.task.title}</h4>
                  <p>Описание задания: {team.hackaton.task.description}</p>
                  <h4>Ссылка на выполненное задание: {team.hackaton.link}</h4>
                </Card.Content>
              )}
              <Card.Content>
                <Card.Header>Участники команды:</Card.Header>
                {team.team.map((item) => (
                  <Feed key={item._id}>
                    <Feed.Event>
                      <Feed.Label image={item.user.avatar} />
                      <Feed.Content>
                        <Grid>
                          <Grid.Row>
                            <GridColumn width={12}>
                              <Feed.Date content={"Статус: " + item.status} />
                              <Feed.Summary>
                                Участник: {item.user.name}
                              </Feed.Summary>
                            </GridColumn>
                            <GridColumn textAlign="center" width={4}>
                              <Button
                                color="red"
                                icon="trash alternate"
                                onClick={() => deleteTeamMate(item.user._id)}
                              />
                            </GridColumn>
                          </Grid.Row>
                        </Grid>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                ))}
                <GridColumn textAlign="center">
                  <Link to="/edit-team">
                    <Button
                      color="blue"
                      icon="id card"
                      labelPosition="left"
                      content="Редактировать"
                    />
                  </Link>

                  <Button
                    onClick={handleShowModal}
                    color="green"
                    icon="add user"
                    labelPosition="left"
                    content="Добавить участника"
                  />

                  <Button
                    onClick={handleShow}
                    color="red"
                    icon="trash alternate"
                    labelPosition="left"
                    content="Удалить команду"
                  />
                </GridColumn>
              </Card.Content>
              <Card.Content
                meta={"Дата образования: " + formatDate(team.date)}
              ></Card.Content>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
};

Team.propTypes = {
  team: PropTypes.object.isRequired,
  getMyTeam: PropTypes.func.isRequired,
  deleteTeam: PropTypes.func.isRequired,
  deleteTeamMate: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
};

const mapState = (state) => ({
  team: state.team,
  errors: state.alert,
});

export default connect(mapState, { getMyTeam, deleteTeam, deleteTeamMate })(
  Team
);
