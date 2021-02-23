import React, { createRef, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Signin from "./Components/Auth/Signin";

//conponents
import Footer from "./Components/Layout/Footer";
import Landing from "./Components/Layout/Landing";
import NavBar from "./Components/Layout/NavBar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <section className="wrapper">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
      <Footer />
    </Router>
  );
};

export default App;
