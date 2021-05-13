import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { getTasks } from "../../../Actions/tasks";
import { addHack } from "../../../Actions/hackatons";
import Spinner from "../../Layout/Spinner";
import { Grid, Header, Form, Button } from "semantic-ui-react";

const state = { name: "", period: "", task1: "", task2: "", task3: "" };

const Addhack = ({ getTasks, addHack, task: { loading, tasks }, history }) => {
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const formik = useFormik({
    initialValues: state,
    onSubmit: (values) => {
      addHack(values);
      history.push("/dashboard");
    },
  });

  let options = [];
  tasks.map((item) => {
    options.push({
      text: item.title,
      value: item._id,
      _id: item._id,
    });
  });

  return loading ? (
    <div style={{ minHeight: "100vh" }}>
      <Spinner />
    </div>
  ) : (
    <div>
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: "100vh" }}
      >
        <Grid.Column style={{ maxWidth: 650 }}>
          <Header
            as="h1"
            color="green"
            textAlign="center"
            content="Создать конкурс"
          />
          <Form onSubmit={formik.handleSubmit}>
            <Form.Input
              fluid
              label="Укажите название конкурса"
              icon="tag"
              iconPosition="left"
              id="name"
              placeholder="Название хакатона"
              onChange={formik.handleChange}
              value={formik.values.name}
              autoFocus
              required
            />
            <Form.Input
              fluid
              label="Укажите период проведения конкурса"
              icon="calendar"
              iconPosition="left"
              id="period"
              placeholder="23 марта - 30 марта"
              onChange={formik.handleChange}
              value={formik.values.period}
              required
            />
            <Form.Select
              clearable
              label="Выберете задание для конкурса"
              selection
              options={options}
              onChange={(e) =>
                formik.setFieldValue("task1", e.target.getAttribute("_id"))
              }
              name="task1"
              id="task1"
              value={formik.values.task1}
              placeholder="Выберете задание"
              required
            />
            <Form.Select
              clearable
              selection
              options={options}
              onChange={(e) =>
                formik.setFieldValue("task2", e.target.getAttribute("_id"))
              }
              id="task2"
              value={formik.values.task2}
              placeholder="Выберете задание"
              required
            />
            <Form.Select
              clearable
              selection
              options={options}
              onChange={(e) =>
                formik.setFieldValue("task3", e.target.getAttribute("_id"))
              }
              id="task3"
              value={formik.values.task3}
              placeholder="Выберете задание"
              required
            />
            <Button color="green" size="large" type="submit">
              Сохранить
            </Button>
            <Link to="/dashboard">
              <Button color="teal" size="large">
                Назад
              </Button>
            </Link>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

Addhack.propTypes = {
  task: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
  addHack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, { getTasks, addHack })(Addhack);
