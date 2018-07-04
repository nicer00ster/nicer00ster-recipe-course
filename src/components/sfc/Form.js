import React from 'react';
import { Link } from 'react-router-dom';

const Form = ({ location, className, title, subTitle, onSubmit,
                handleUsername, handleEmail, handlePassword, message,
                redirect, link, button, ref }) => (
    <div>
      <form onSubmit={onSubmit} className={`form__${className}`}>
        <div className={`form__${className}--title`}>
          {title}
        </div>
        <h4>{subTitle}</h4>
        { location.pathname === "/register"
          ? <div className={`form__${className}--username`}>
              <input onChange={handleUsername} required placeholder="Username" type="text" name="name" />
            </div>
          : null }
        <div className={`form__${className}--email`}>
          <input onChange={handleEmail} required placeholder="Email" type="email" name="name" />
        </div>
        <div className={`form__${className}--password`}>
          <input onChange={handlePassword} required placeholder="Password" type="password" name="password"/>
        </div>
        <input className={`form__${className}--submit`} type="submit" value={button} />
        <div>
          <span className={`form__${className}--account`}>{message}{' '}<Link to={redirect}>{link}</Link></span>
        </div>
      </form>
    </div>
)

export default Form;