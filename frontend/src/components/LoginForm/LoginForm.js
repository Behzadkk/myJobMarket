import React from "react";
import SwitchRegister from "../SwitchRegister/SwitchRegister";
import SwitchSignin from "../SwitchSignin/SwitchSignin";

import "./LoginForm.css";

const LoginForm = props => {
  return (
    <div className='ui container placeholder segment'>
      <div className='ui two column stackable center aligned grid'>
        <div className='ui vertical divider'>Or</div>
        <div className='middle aligned row'>
          <div className='column'>
            <form
              className='ui form login-form'
              onSubmit={props.onFormSubmition}
            >
              <div className=' field form-control'>
                <label htmlFor='email'>E-Mail</label>
                <input type='email' id='email' ref={props.emailEl} />
              </div>
              <div className='field form-control'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' ref={props.passwordEl} />
              </div>
              <div className='field'>
                <div className='ui checkbox'>
                  <input type='checkbox' tabindex='0' className='hidden' />
                  <label>I agree to the Terms and Conditions</label>
                </div>
              </div>
              <div className='form-actions'>
                <button className='ui button teal' type='submit'>
                  {props.loginState ? "Sign in" : "Register"}
                </button>
              </div>
            </form>
          </div>
          <div className='column'>
            {props.loginState ? <SwitchRegister /> : <SwitchSignin />}
            <button
              className='ui button basic teal'
              type='button'
              onClick={props.onSwitchMode}
            >
              Switch to {props.loginState ? "Register" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
