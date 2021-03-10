import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Header,
  Card,
  Feed,
  Container,
  CardDescription,
  Button,
  Grid,
  GridColumn,
  Icon,
} from "semantic-ui-react";
import { getMyTeam } from "../../Actions/team";
import formatDate from "../../Utils/formatDate";
import Spinner from "../Layout/Spinner";

const Team = ({ getMyTeam, team: { loading, team } }) => {
  useEffect(() => {
    getMyTeam();
  }, [getMyTeam]);

  console.log(team);

  return (
    <div style={{ height: "100vh" }}>
      <Container>
        <Header
          as="h2"
          content="Карточка команды"
          textAlign="center"
          color="green"
        />
        <hr />
        {!loading && team ? (
          <Card fluid color="green">
            <Card.Content>
              <Card.Header>Название команды: {team.name}</Card.Header>
              <CardDescription></CardDescription>
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
                            <Button color="red">
                              <Icon name="trash alternate" />
                              Удалить
                            </Button>
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
        ) : (
          <Spinner />
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
