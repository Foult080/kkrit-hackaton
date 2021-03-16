import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./store";

//auth
import setAuthToken from "./Utils/setAuthToken";
import { loadUser } from "./Actions/auth";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Components/Auth/Login";
import Signin from "./Components/Auth/Signin";

//conponents
import Footer from "./Components/Layout/Footer";
import Landing from "./Components/Layout/Landing";
import NavBar from "./Components/Layout/NavBar";
import Dashboard from "./Components/Dashboard/Dashboard";
import CreateTeam from "./Components/Dashboard/CreateTeam";

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <section className="wrapper">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-team" component={CreateTeam} />
            <PrivateRoute exact path="/edit-team" component={CreateTeam} />
          </Switch>
        </section>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
