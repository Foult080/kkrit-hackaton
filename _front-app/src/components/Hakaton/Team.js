import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import "moment/locale/ru";
import Spinner from "../Layout/spinner";
import {
  getTeam,
  addTeamMate,
  deleteTeamMate,
  deleteTeam,
  deleteFromTeam,
} from "../../actions/hack";
import { Button, Modal, Card, Table } from "react-bootstrap";

const Team = ({
  getTeam,
  addTeamMate,
  deleteTeamMate,
  deleteFromTeam,
  deleteTeam,
  team: { myTeam, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getTeam();
  }, [getTeam]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");

  const add_teammate = () => {
    addTeamMate(email);
    handleClose();
    setEmail("");
  };

  const del_teammate = (e) => {
    deleteTeamMate(e.target.value);
  };

  const del_team = (e) => {
    deleteTeam(e.target.value);
  };

  const leave_team = (e) => {
    deleteFromTeam(e.target.value);
  };

  const OnChange = (e) => {
    setEmail(e.target.value);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      {myTeam === null ? (
        <Fragment>
          <div className="title">
            <h4>У вас пока еще нет команды!</h4>
            <Link to="/hack/create-team" className="btn btn-danger">
              Заполнить анкету команды <i className="far fa-address-card"></i>
            </Link>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h4 className="title">Ваша команда</h4>
          <div className="team">
            {myTeam.capt === user._id ? (
              <Fragment>
                <div className="modal-window">
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Добавить участника</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Введите E-mail участника:</p>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="E-mail участника"
                        name="email"
                        required
                        value={email}
                        onChange={OnChange}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={handleClose}>
                        Отмена
                      </Button>
                      <Button
                        type="submit"
                        variant="success"
                        onClick={add_teammate}
                      >
                        Добавить
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>

                <div className="capt-part">
                  <Card className="text-center">
                    <Card.Header style={styles.title}>
                      Вы капитан команды: {myTeam.name}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Информация о событии</Card.Title>
                      <hr />
                      <div className="hackInfo">
                        {myTeam.hackaton ? (
                          <Fragment>
                            <Card.Text>
                              Наименование: {myTeam.hackaton.name}
                            </Card.Text>
                            <Card.Text>
                              Дата проведения:{" "}
                              <Moment locale="ru" format="ll"></Moment>
                            </Card.Text>
                            <Card.Text>
                              Название Кейса: {myTeam.hackaton.teamCase.name}
                            </Card.Text>
                            <Card.Text>
                              Описание задачи:{" "}
                              {myTeam.hackaton.teamCase.description}
                            </Card.Text>
                            <p>
                              Ссылка для решения кейса:{" "}
                              <span className="hack-link">
                                {myTeam.hackaton.link}
                              </span>
                            </p>
                          </Fragment>
                        ) : (
                          <Card.Text>
                            Вы еще не выбрали Кейс в Хакатоне
                          </Card.Text>
                        )}
                      </div>
                      <div className="teamInfo">
                        <Card.Title className="my-4">
                          Участники команды:
                        </Card.Title>
                        <hr />
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Имя</th>
                              <th>E-mail</th>
                              <th>Статус</th>
                              <th>Действия</th>
                            </tr>
                          </thead>
                          <tbody>
                            {myTeam.team.map((el) => (
                              <tr key={el._id}>
                                <td>{myTeam.team.indexOf(el) + 1}</td>
                                <td>{el.name}</td>
                                <td>{el.email}</td>
                                <td>{el.status}</td>
                                <td>
                                  <Button
                                    style={styles.button}
                                    variant="danger"
                                    value={el._id}
                                    onClick={del_teammate}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <Button variant="success" onClick={handleShow}>
                          Добавить Участника <i className="fas fa-user"></i>
                        </Button>
                        <div className="text-center mx-auto my-4">
                          <Link to="/hack/edit-team">
                            <Button variant="primary">
                              Редактировать{" "}
                              <i className="far fa-address-card"></i>
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            className="ml-1"
                            value={myTeam._id}
                            onClick={del_team}
                          >
                            Удалить Команду <i className="fas fa-trash-alt"></i>
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      <p>
                        Дата создания:{" "}
                        <Moment locale="ru" format="ll">
                          {myTeam.date}
                        </Moment>
                      </p>
                    </Card.Footer>
                  </Card>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="teamMate-part">
                  <Card className="text-center">
                    <Card.Header style={styles.title}>
                      Вы участник команды: {myTeam.name}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>Информация о событии</Card.Title>
                      <hr />
                      <div className="hackInfo">
                        {myTeam.hackaton ? (
                          <Fragment>
                            <Card.Text>
                              Наименование: {myTeam.hackaton.name}
                            </Card.Text>
                            <Card.Text>
                              Дата проведения:{" "}
                              <Moment locale="ru" format="ll"></Moment>
                            </Card.Text>
                            <Card.Text>
                              Название Кейса: {myTeam.hackaton.teamCase.name}
                            </Card.Text>
                            <Card.Text>
                              Описание задачи:{" "}
                              {myTeam.hackaton.teamCase.description}
                            </Card.Text>
                            <Card.Text>
                              Ссылка для решения кейса: {myTeam.hackaton.link}
                            </Card.Text>
                          </Fragment>
                        ) : (
                          <Card.Text>
                            Вы еще не выбрали Кейс в Хакатоне
                          </Card.Text>
                        )}
                      </div>
                      <div className="teamInfo">
                        <Card.Title className="my-4">
                          Участники команды:
                        </Card.Title>
                        <hr />
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Имя</th>
                              <th>E-mail</th>
                              <th>Статус</th>
                            </tr>
                          </thead>
                          <tbody>
                            {myTeam.team.map((el) => (
                              <tr key={el._id}>
                                <td>{myTeam.team.indexOf(el) + 1}</td>
                                <td>{el.name}</td>
                                <td>{el.email}</td>
                                <td>{el.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>

                        <Button
                          variant="danger"
                          className="ml-1"
                          value={myTeam._id}
                          onClick={leave_team}
                        >
                          Покинуть команду <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      <p>
                        Дата создания:{" "}
                        <Moment locale="ru" format="ll">
                          {myTeam.date}
                        </Moment>
                      </p>
                    </Card.Footer>
                  </Card>
                </div>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

const styles = {
  title: {
    fontSize: "1.5rem",
    fontWeight: 500,
  },
  button: {
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
  },
};

Team.propTypes = {
  getTeam: PropTypes.func.isRequired,
  addTeamMate: PropTypes.func.isRequired,
  deleteTeamMate: PropTypes.func.isRequired,
  deleteFromTeam: PropTypes.func.isRequired,
  deleteTeam: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  team: state.team,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getTeam,
  addTeamMate,
  deleteTeamMate,
  deleteFromTeam,
  deleteTeam,
})(Team);
