import React from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/authContext";

import "./MainNavigation.css";

const MainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className='ui teal three item inverted secondary   menu main-nav'>
          <div className='main-nav__logo item'>
            <h1>myJobMarket</h1>
          </div>
          <div className='item' />
          <nav className='main-nav__items item'>
            <ul>
              {!context.token && (
                <li>
                  <NavLink to='./auth'>Sign in</NavLink>
                </li>
              )}
              <li>
                <NavLink to='./projects'>Projects</NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to='./applications'>Applications</NavLink>
                  </li>
                  <li>
                    <a onClick={context.logout}>Logout</a>
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
