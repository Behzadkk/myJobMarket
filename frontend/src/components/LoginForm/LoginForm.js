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
            <form className='ui large form' onSubmit={props.onFormSubmition}>
              <div className='ui stacked secondary '>
                <div className=' field'>
                  <div className='ui left icon input'>
                    <i className='user icon' />
                    <input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='E-mail address'
                      ref={props.emailEl}
                    />
                  </div>
                </div>
                <div className=' field'>
                  <div className='ui left icon input'>
                    <i className='lock icon' />
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Password'
                      ref={props.passwordEl}
                    />
                  </div>
                </div>
                {!props.loginState && (
                  <div className=' field'>
                    <div className='ui left icon input'>
                      <i className='lock icon' />
                      <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Repeat Password'
                      />
                    </div>
                  </div>
                )}

                <div className='field'>
                  <div className='ui checkbox'>
                    <input
                      type='checkbox'
                      tabindex='0'
                      className='hidden'
                      checked
                    />
                    <label>I agree to the Terms and Conditions</label>
                  </div>
                </div>
                <div className='form-actions'>
                  <button
                    className='ui fluid large teal submit button'
                    type='submit'
                  >
                    {props.loginState ? "Sign in" : "Register"}
                  </button>
                </div>
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
