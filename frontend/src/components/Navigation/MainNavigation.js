import React from "react";
import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

const MainNavigation = props => (
  <header className="main-nav">
    <div className="main-nav__logo">
      <h1>myJobMarket</h1>
    </div>
    <nav className="main-nav__items">
      <ul>
        <li>
          <NavLink to="./users">Users</NavLink>
        </li>
        <li>
          <NavLink to="./projects">Projects</NavLink>
        </li>
        <li>
          <NavLink to="./applications">Applications</NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default MainNavigation;
