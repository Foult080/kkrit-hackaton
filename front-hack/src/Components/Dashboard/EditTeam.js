import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useFormik, useField } from "formik";
import { getMyTeam } from "../../Actions/team";
import { getCurrent } from "../../Actions/hackatons";
import { Button, Grid, Header, Message, Form } from "semantic-ui-react";
import Spinner from "../Layout/Spinner";

const EditTeam = ({
  getMyTeam,
  team: { loading, team },
  getCurrent,
  hack,
  errors,
}) => {
  useEffect(() => {
    getMyTeam();
    getCurrent();
  }, [getMyTeam, getCurrent]);

  const formik = useFormik({
    initialValues: { name: "", hack: "", task: "", link: "" },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  let options = [];
  if (hack) {
    hack.tasks.map((item) => {
      options.push({
        key: item._id,
        text: item.title,
        value: item._id,
        name: "task",
        id: "task",
      });
    });
  }

  console.log(team);
  console.warn(hack);
  return loading ? (
    <Spinner />
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
            <h1>Hello</h1>
          ) : (
            <div class="field">
              <label>Выберете задание</label>
              <select
                class="ui fluid dropdown"
                name="task"
                onChange={formik.handleChange}
              >
                {hack.tasks.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button color="green" size="large" type="submit">
            Зарегистрироваться
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

EditTeam.propType = {
  getMyTeam: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
  getCurrent: PropTypes.func.isRequired,
  hack: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  errors: state.alert,
  team: state.team,
  hack: state.hackatons.hack,
});

export default connect(mapState, { getMyTeam, getCurrent })(EditTeam);
