import React, { Fragment } from "react";
import Footer from "./Components/Footer";
import Landing from "./Components/Landing";
import NavBar from "./Components/NavBar";

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Landing />
      <Footer />
    </Fragment>
  );
};

export default App;
