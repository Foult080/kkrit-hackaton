import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllTeams } from "../../../Actions/team";
import Spinner from "../../Layout/Spinner";
import {
  Header,
  Card,
  Feed,
  Grid,
  GridColumn,
  Button,
} from "semantic-ui-react";

const ListTeams = ({ getAllTeams, teams: { loading, teams } }) => {
  useEffect(() => {
    getAllTeams();
  }, [getAllTeams]);

  console.log(teams);

  return loading && teams === null ? (
    <Spinner />
  ) : (
    <div style={{ marginBottom: "2em" }}>
      <Header
        as="h2"
        content="Список Команд"
        textAlign="center"
        color="green"
      />
      <hr />

      {teams.map((team) => (
        <Card fluid color="green" key={team._id}>
          <Card.Content>
            <Card.Header>Название команды: {team.name}</Card.Header>
          </Card.Content>
          {team.hackaton.hack === null ? (
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
                      </Grid.Row>
                    </Grid>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            ))}
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

ListTeams.propTypes = {
  getAllTeams: PropTypes.func.isRequired,
  teams: PropTypes.object.isRequired,
  error: PropTypes.array.isRequired,
};

const mapState = (state) => ({
  teams: state.team,
  error: state.alert,
});

export default connect(mapState, { getAllTeams })(ListTeams);
