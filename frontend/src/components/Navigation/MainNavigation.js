import React from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/authContext";

import "./MainNavigation.css";

const MainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-nav">
          <div className="main-nav__logo">
            <h1>myJobMarket</h1>
          </div>
          <nav className="main-nav__items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="./auth">Authorization</NavLink>
                </li>
              )}
              <li>
                <NavLink to="./projects">Projects</NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="./applications">Applications</NavLink>
                  </li>
                  <li>
                    <button onClick={context.logout}>Logout</button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;
