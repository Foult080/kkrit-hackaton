import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { getMyTeam, createTeam } from "../../Actions/team";
import { getCurrent } from "../../Actions/hackatons";
import { Button, Grid, Header, Message, Form } from "semantic-ui-react";
import Spinner from "../Layout/Spinner";

const CreateTeam = ({
  getMyTeam,
  createTeam,
  getCurrent,
  team,
  hack: { loading, hack },
  errors,
  history,
}) => {
  useEffect(() => {
    getMyTeam();
    getCurrent();
  }, [getMyTeam, getCurrent]);

  const values = { name: "", hack: null, task: null, link: "" };
  if (team) {
    if (team.name) values.name = team.name;
    if (team.hack) values.hack = team.hackaton.hack._id;
    if (team.task) values.task = team.hackaton.task._id;
    if (team.link) values.link = team.hackaton.link;
  }
  const formik = useFormik({
    initialValues: values,
    onSubmit: (values) => {
      if (hack) values.hack = hack._id;
      createTeam(values);
      history.push("/dashboard");
    },
  });

  let options = [];
  if (hack) {
    hack.tasks.map((item) => {
      options.push({
        key: item._id,
        text: item.title,
        value: item._id,
        name: item._id,
      });
    });
  }

  return loading ? (
    <div style={{ minHeight: "100vh" }}>
      <Spinner />
    </div>
  ) : (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column style={{ maxWidth: 650 }}>
        {team === null ? (
          <Header as="h1" color="green" textAlign="center">
            Создать команду
          </Header>
        ) : (
          <Header as="h1" color="green" textAlign="center">
            Редактировать команду
          </Header>
        )}
        {errors &&
          errors.map((item) => (
            <Message attached negative content={item.msg} />
          ))}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Input
            fluid
            label="Название команды"
            icon="tag"
            iconPosition="left"
            id="name"
            placeholder="Укажите имя"
            onChange={formik.handleChange}
            value={formik.values.name}
            autoFocus
            required
          />

          {hack === null ? (
            <h3>На данный момент хакатонов нет</h3>
          ) : (
            <div style={{ marginBottom: "1em" }}>
              <Header as="h3" color="green" textAlign="center">
                {hack.name}
              </Header>
              <p>{hack.period}</p>
              <Form.Select
                clearable
                selection
                options={options}
                onChange={(e) =>
                  formik.setFieldValue("task", e.target.getAttribute("name"))
                }
                name="task"
                value={formik.values.task}
                placeholder="Выберете задание"
              />
              <Form.Input
                fluid
                label="Ссылка на выполненное задание"
                icon="linkify"
                iconPosition="left"
                id="link"
                placeholder="Ссылка на проект"
                onChange={formik.handleChange}
                value={formik.values.link}
                required
              />
            </div>
          )}

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
  );
};

CreateTeam.propType = {
  getMyTeam: PropTypes.func.isRequired,
  createTeam: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
  getCurrent: PropTypes.func.isRequired,
  hack: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  errors: state.alert,
  team: state.team.team,
  hack: state.hackatons,
});

export default connect(mapState, { getMyTeam, getCurrent, createTeam })(
  CreateTeam
);
