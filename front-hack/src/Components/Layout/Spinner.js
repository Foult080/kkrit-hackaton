import React, { Fragment } from "react";
import spinner from "./spinner2.gif";

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "250px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
