import React, { Component } from "react";

import AuthContext from "../context/authContext";

import "./Login.css";

class LoginPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailInput.current.value;
    const password = this.passwordInput.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = {
      email: email,
      password: password
    };

    let api = "/api/login";

    if (!this.state.isLogin) {
      api = "/api/users";
    }
    fetch(api, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        if (resData.token) {
          this.context.login(resData.token, resData.userId);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailInput} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordInput} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? "Register" : "Log in"}
          </button>
        </div>
      </form>
    );
  }
}

export default LoginPage;
