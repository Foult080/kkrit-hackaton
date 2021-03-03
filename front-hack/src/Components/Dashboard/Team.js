import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Grid } from "semantic-ui-react";
import { getMyTeam } from "../../Actions/team";

const Team = ({ getMyTeam, team }) => {
  useEffect(() => {
    getMyTeam();
  }, [getMyTeam]);

  return (
    <div>
      <Header as="h2" content="Моя команда" textAlign="center" color="green" />
      <hr />
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      ></Grid>
    </div>
  );
};

Team.propTypes = {
  team: PropTypes.object.isRequired,
  getMyTeam: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  team: state.team,
});

export default connect(mapState, { getMyTeam })(Team);
