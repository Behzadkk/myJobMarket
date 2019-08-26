import React from "react";

const SigninForm = props => {
  <form className='"ui large form' onSubmit={props.onFormSubmition}>
    <div className='ui stacked secondary  segment'>
      <div className=' field form-control'>
        <div className='ui left icon input'>
          <i className='user icon' />
          <input
            type='email'
            id='email'
            ref={props.emailEl}
            placeholder='E-mail address'
          />
        </div>
      </div>
      <div className='field form-control'>
        <div className='ui left icon input'>
          <i className='lock icon' />
          <input
            type='password'
            id='password'
            ref={props.passwordEl}
            placeholder='Password'
          />
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
      </div>
    </div>
  </form>;
};

export default SigninForm;
