import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/spinner";
import { getHack } from "../../actions/hack";
import ShowHack from "./ShowHack";
import Team from "./Team";

const Hack = ({ getHack, hack: {hack, loading} }) => {
  useEffect(() => {
    getHack();
  }, [getHack]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <div className="hack-el">
          {hack === null ? (
            <h4 className="title">
              В данный момент никаких хакатонов не проводится.
            </h4>
          ) : (
            <Fragment>
              <ShowHack hack={hack} />
              <Team />
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Hack.propTypes = {
  getHack: PropTypes.func.isRequired,
  hack: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  hack: state.hack,
});

export default connect(mapStateToProps, { getHack })(Hack);
