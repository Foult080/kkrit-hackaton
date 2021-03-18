import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { Button, Modal, Form } from "semantic-ui-react";
import { addTeamMate } from "../../Actions/team";

const ModalAdd = ({ show, close, id, addTeamMate }) => {
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: (values) => {
      values.id = id;
      addTeamMate(values);
      formik.values.email = "";
      close();
    },
  });

  console.log(id);
  return (
    <div>
      <Modal open={show} onClose={close} size="mini">
        <Modal.Header>Добавить участника</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              fluid
              label="Укажите корректный e-mail адресс участника:"
              icon="mail"
              iconPosition="left"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              id="link"
              placeholder="e-mail адресс"
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

ModalAdd.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  addTeamMate: PropTypes.func.isRequired,
};

export default connect(null, { addTeamMate })(ModalAdd);
