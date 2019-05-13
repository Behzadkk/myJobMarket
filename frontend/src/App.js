import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LoginPage from "./pages/Login";
import ProjectsPage from "./pages/Projects";
import ApplicationsPage from "./pages/Applications";
import MainNavigation from "./components/Navigation/MainNavigation";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/users" exact />
            <Route path="/users" component={LoginPage} />
            <Route path="/projects" component={ProjectsPage} />
            <Route path="/applications" component={ApplicationsPage} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
