import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Header,
  Card,
  Feed,
  Container,
  Button,
  Grid,
  GridColumn,
  Icon,
  Segment,
} from "semantic-ui-react";
import { getMyTeam } from "../../Actions/team";
import formatDate from "../../Utils/formatDate";
import Spinner from "../Layout/Spinner";

const Team = ({ getMyTeam, team: { loading, team } }) => {
  useEffect(() => {
    getMyTeam();
  }, [getMyTeam]);

  return loading ? (
    <Container>
      <Spinner />
    </Container>
  ) : (
    <div style={{ height: "100vh" }}>
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
            <Button
              as="a"
              href="/create-team"
              color="blue"
              size="large"
              icon="id card"
              labelPosition="left"
              content="Создать команду"
            />
          </Segment>
        ) : (
          <Card fluid color="green">
            <Card.Content>
              <Card.Header>Название команды: {team.name}</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Header>Название команды: {team.name}</Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Header>Участники:</Card.Header>
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
                            <Button color="red" icon="trash alternate" />
                          </GridColumn>
                        </Grid.Row>
                      </Grid>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              ))}
              <GridColumn textAlign="center">
                <Button color="blue">
                  <Icon name="edit" />
                  Редактировать
                </Button>
                <Button color="green">
                  <Icon name="add user" />
                  Добавить участника
                </Button>
                <Button color="red">
                  <Icon name="trash alternate" />
                  Удалить команду
                </Button>
              </GridColumn>
            </Card.Content>
            <Card.Content
              meta={"Дата образования: " + formatDate(team.date)}
            ></Card.Content>
          </Card>
        )}
      </Container>
    </div>
  );
};

Team.propTypes = {
  team: PropTypes.object.isRequired,
  getMyTeam: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  team: state.team,
});

export default connect(mapState, { getMyTeam })(Team);
