import React from 'react';
import { Link } from 'react-router-dom';

const Form = props => (
    <div>
      <form onSubmit={props.onSubmit} className={`form__${props.className}`}>
        <div className={`form__${props.className}--title`}>
          {props.title}
        </div>
        <h4>{props.subTitle}</h4>
        { props.location.pathname === "/register"
          ? <div className={`form__${props.className}--username`}>
              <input onChange={props.handleUsername} required placeholder="Username" type="text" />
            </div>
          : null }
        <div className={`form__${props.className}--email`}>
          <input onChange={props.handleEmail} required placeholder="Email" type="email" />
        </div>
        <div className={`form__${props.className}--password`}>
          <input onChange={props.handlePassword} required placeholder="Password" type="password" />
        </div>
        <input className={`form__${props.className}--submit`} type="submit" value={props.button} />
        <div>
          <span className={`form__${props.className}--account`}>{props.message}{' '}<Link to={props.redirect}>{props.link}</Link></span>
        </div>
      </form>
    </div>
)

export default Form;
