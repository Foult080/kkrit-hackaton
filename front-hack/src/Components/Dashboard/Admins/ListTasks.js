import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTasks } from "../../../Actions/tasks";
import Spinner from "../../Layout/Spinner";
import { Button, Card, Header, GridColumn } from "semantic-ui-react";
import AddModalTask from "./AddModalTask";

const ListTasks = ({ getTasks, task: { loading, tasks } }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const [id, setID] = useState("");
  const handler = (e) => {
    setID(e.target.id);
    showHandler();
  };

  const [show, setShow] = useState(false);
  const showHandler = () => {
    setShow(!show);
  }
  


  return loading && tasks === null ? (
    <Spinner />
  ) : (
    <div>
      <AddModalTask show={show} close={showHandler} id={id} />
      <Header as="h2" content="Список задач" textAlign="center" color="green" />
      <hr />
      {tasks.map((item) => (
        <Card fluid key={item._id}>
          <Card.Content>
            <Card.Header content={item.title} />
            <Card.Description content={item.description} />
            <GridColumn textAlign="right">
              <Button
                color="blue"
                icon="id card"
                labelPosition="left"
                content="Редактировать"
                value={item._id}
                onClick={handler}
              />

              <Button
                color="green"
                icon="add user"
                labelPosition="left"
                content="Добавить участника"
                onClick={showHandler}
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
