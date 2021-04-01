import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTasks } from "../../../Actions/tasks";
import Spinner from "../../Layout/Spinner";
import {
  Button,
  Card,
  Header,
  GridColumn,
  Grid,
  Message,
} from "semantic-ui-react";
import AddModalTask from "./AddModalTask";

const ListTasks = ({ getTasks, task: { loading, tasks }, errors }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const [task, setTask] = useState(null);
  const handler = (e) => {
    let item = tasks.find((item) => item._id == e.target.value);
    setTask(item);
    showHandler();
  };

  const [show, setShow] = useState(false);
  const showHandler = () => {
    setShow(!show);
  };

  return loading && tasks === null ? (
    <Spinner />
  ) : (
    <div style={{ marginBottom: "2em" }}>
      <AddModalTask show={show} close={showHandler} task={task} />
      <Header as="h2" content="Список задач" textAlign="center" color="green" />
      <hr />
      {errors &&
        errors.map((item) => (
          <Message key={item.id} color={item.type} content={item.msg} />
        ))}
      {tasks.map((item) => (
        <Card fluid key={item._id}>
          <Card.Content>
            <Card.Header content={item.title} />
            <Card.Description content={item.description} />
            <GridColumn textAlign="right">
              <Button
                color="teal"
                icon="edit"
                value={item._id}
                onClick={handler}
              />
              <Button color="red" icon="trash alternate" />
            </GridColumn>
          </Card.Content>
        </Card>
      ))}
      <Grid textAlign="center">
        <GridColumn>
          <Button
            color="green"
            icon="add square"
            labelPosition="left"
            content="Добавить задание"
            onClick={showHandler}
          />
        </GridColumn>
      </Grid>
    </div>
  );
};

ListTasks.propTypes = {
  task: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
};

const mapState = (state) => ({
  task: state.task,
  errors: state.alert,
});

export default connect(mapState, { getTasks })(ListTasks);
