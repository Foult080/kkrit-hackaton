import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTasks } from "../../../Actions/tasks";
import Spinner from "../../Layout/Spinner";
import { Button, Card, Header, GridColumn } from "semantic-ui-react";

const ListTasks = ({ getTasks, task: { loading, tasks } }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  console.log(loading, tasks);
  return loading && tasks === null ? (
    <Spinner />
  ) : (
    <div>
      <Header as="h2" content="Список задач" textAlign="center" color="green" />
      <hr />
      {tasks.map((item) => (
        <Card fluid>
          <Card.Content>
            <Card.Header content={item.title} />
            <Card.Description content={item.description} />
            <GridColumn textAlign="right">
              <Button
                color="blue"
                icon="id card"
                labelPosition="left"
                content="Редактировать"
              />

              <Button
                color="green"
                icon="add user"
                labelPosition="left"
                content="Добавить участника"
              />
            </GridColumn>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

ListTasks.propTypes = {
  task: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  task: state.task,
});

export default connect(mapState, { getTasks })(ListTasks);
