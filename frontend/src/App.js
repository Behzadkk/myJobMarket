import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LoginPage from "./pages/Login";
import ProjectsPage from "./pages/Projects";
import ApplicationsPage from "./pages/Applications";
import MainNavigation from "./components/Navigation/MainNavigation";
import AuthContext from "./context/authContext";

import "./App.css";

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };
  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {!this.state.token && <Redirect from="/" to="/auth" exact />}
              {this.state.token && <Redirect from="/" to="/projects" exact />}
              {this.state.token && (
                <Redirect from="/auth" to="/projects" exact />
              )}

              {!this.state.token && (
                <Route path="/auth" component={LoginPage} />
              )}
              <Route path="/projects" component={ProjectsPage} />
              {this.state.token && (
                <Route path="/applications" component={ApplicationsPage} />
              )}
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
