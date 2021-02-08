import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const initialState = [
  {
    name: "",
    description: "",
  },
];

const AddHack = ({ show, onHide, addHackaton }) => {
  //cases block
  const [cases, setCases] = useState(initialState);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...cases];
    list[index][name] = value;
    setCases(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...cases];
    list.splice(index, 1);
    setCases(list);
  };

  const handleAddClick = () => {
    setCases([...cases, { name: "", description: "" }]);
  };

  //main block
  const [name, setName] = useState("");
  const handleOnChange = (el) => {
    setName(el.target.value);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    addHackaton(name, cases);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить Хакатон
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Основное</h4>
        <Form onSubmit={handlerSubmit}>
          <Form.Group controlId="fromBasicInput">
            <Form.Label>Укажите название Хакатона</Form.Label>
            <Form.Control
              placeholder="Название хакатона"
              name="name"
              value={name}
              onChange={handleOnChange}
            />
          </Form.Group>
          <h4 className="mt-2">Кейсы</h4>
          <hr />
          <div className="cases">
            {cases.map((x, i) => {
              return (
                <div key={i}>
                  <Form.Group controlId={`BasicInputName${i}`}>
                    <Form.Label>Укажите название кейса</Form.Label>
                    <Form.Control
                      placeholder="Название кейса"
                      name="name"
                      value={x.name}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </Form.Group>
                  <Form.Group controlId={`BasicInputDesc${i}`}>
                    <Form.Label>Укажите описание кейса</Form.Label>
                    <Form.Control
                      name="description"
                      placeholder="Описание кейса"
                      as="textarea"
                      rows={2}
                      value={x.description}
                      onChange={(e) => handleInputChange(e, i)}
                    />
                  </Form.Group>
                  {cases.length !== 1 && (
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Удалить
                    </Button>
                  )}
                  <div className="text-center">
                    {cases.length - 1 === i && (
                      <Button variant="success" onClick={handleAddClick}>
                        Добавить поле
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="primary" type="submit" onClick={handlerSubmit}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddHack;
