import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/spinner";
import { getTeams } from "../../actions/hack";
import { Table } from "react-bootstrap";

const AdminTeams = ({ getTeams, team: { teams, loading } }) => {
  useEffect(() => {
    getTeams();
  }, [getTeams]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="admin teams block">
      {teams.length === 0 ? (
        <h4 className="text-center my-4">Команды в данный момент отсутсвуют</h4>
      ) : (
        <div className="teams">
          <h4 className="text-center my-4 mb-2">Команды Хакатона</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Кейс</th>
                <th>Капитан</th>
                <th>Участники</th>
                <th>Ссылка</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((item) => (
                <tr key={item._id}>
                  <td>{teams.indexOf(item) + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.hackaton.teamCase.name}</td>
                  <td>
                    {item.capt.name} - {item.capt.email}
                  </td>
                  <td>
                    {item.team.map((el) => (
                      <p key={el._id}>
                        {el.name} - {el.email}
                      </p>
                    ))}
                  </td>
                  <td>{item.hackaton.link}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

AdminTeams.propTypes = {
  getTeams: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  team: state.team,
});

export default connect(mapStateToProps, { getTeams })(AdminTeams);
