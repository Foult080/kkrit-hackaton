import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { Button, Modal, Form } from "semantic-ui-react";

const initial = { title: "", description: "" };

const AddModalTask = ({ show, close, id }) => {
  const formik = useFormik({
    initialValues: initial,
    onSubmit: (values) => {
      values.id = id;
      formik.values = initial;
      console.log(values);
      close();
    },
  });

  return (
    <div>
      <Modal open={show} onClose={close} size="small">
        <Modal.Header>Добавить участника</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              fluid
              label="Укажите название для задания"
              icon="tasks"
              iconPosition="left"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Название"
              required
            />
            <Form.TextArea
            
              label="Укажите описание для задания"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Описание"
              required
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={close}>
            Отмена
          </Button>
          <Button positive onClick={formik.handleSubmit}>
            Добавить
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

AddModalTask.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default connect(null)(AddModalTask);
