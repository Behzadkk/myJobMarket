import React from "react";

import "./LoginForm.css";

const LoginForm = props => {
  return (
    <form className="login-form" onSubmit={props.onFormSubmition}>
      <div className="form-control">
        <label htmlFor="email">E-Mail</label>
        <input type="email" id="email" ref={props.emailEl} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={props.passwordEl} />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={props.onSwitchMode}>
          Switch to {props.loginState ? "Register" : "Log in"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
