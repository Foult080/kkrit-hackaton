import React from "react";
import spinner from "./imgs/Rolling-1s-200px.gif";
import { Container } from "semantic-ui-react";

const Spinner = () => (
  <Container>
    <img
      src={spinner}
      style={{
        width: "250px",
        margin: "auto",
        marginTop: "3em",
        display: "block",
      }}
      alt="Loading..."
    />
  </Container>
);

export default Spinner;
