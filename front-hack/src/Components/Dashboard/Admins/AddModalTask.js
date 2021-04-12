import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTask } from "../../../Actions/tasks";
import { useFormik } from "formik";
import { Button, Modal, Form } from "semantic-ui-react";

const values = { title: "", description: "", id: null };

const AddModalTask = ({ show, close, task, addTask }) => {
  if (task) {
    values.title = task.title;
    values.description = task.description;
    values.id = task._id;
  }

  const formik = useFormik({
    initialValues: values,
    onSubmit: (values) => {
      addTask(values);
      formik.values = { title: "", description: "", id: null };
      close();
    },
  });

  const closeModal = () => {
    formik.values = { title: "", description: "", id: null };
    close();
  };

  return (
    <div>
      <Modal open={show} onClose={closeModal} size="small">
        {task == null ? (
          <Modal.Header>Добавить задание</Modal.Header>
        ) : (
          <Modal.Header>Редактировать задание</Modal.Header>
        )}
        <Modal.Content>
          <Form onSubmit={formik.handleSubmit}>
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
          <Button negative onClick={closeModal}>
            Отмена
          </Button>
          <Button positive type="submit" onClick={formik.handleSubmit}>
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
  addTask: PropTypes.func.isRequired,
};

export default connect(null, { addTask })(AddModalTask);
