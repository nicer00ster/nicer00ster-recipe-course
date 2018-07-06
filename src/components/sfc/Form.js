import React from 'react';
import { Link } from 'react-router-dom';

const Form = props => (
    <div>
      <form onSubmit={props.onSubmit} className="form">
        <div className="form__title">
          REACT RECIPES!
        </div>
        <h4>{props.subTitle}</h4>
        { props.location.pathname === "/register"
          ? <div className="form__username">
              <input onChange={props.handleUsername} required placeholder="Username" type="text" />
            </div>
          : null }
        <div className="form__email">
          <input onChange={props.handleEmail} required placeholder="Email" type="email" />
        </div>
        <div className="form__password">
          <input onChange={props.handlePassword} required placeholder="Password" type="password" />
        </div>
        <input className="form__submit" type="submit" value={props.button} />
        <div>
          <span className="form__register">{props.message}{' '}<Link to={props.redirect}>{props.link}</Link></span>
        </div>
      </form>
    </div>
)

export default Form;
