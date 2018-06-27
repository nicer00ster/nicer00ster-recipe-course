import React from 'react';
import { Link } from 'react-router-dom';

const Form = ({ className, title, subTitle, onSubmit, handleEmail, handlePassword, message, redirect, link, button }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className={`landing__${className}`}>
        <div className={`landing__${className}--title`}>
          {title}
        </div>
        <h4>{subTitle}</h4>
        <div className={`landing__${className}--name`}>
          <input onChange={handleEmail} placeholder="Email" type="text" name="name" />
        </div>
        <div className={`landing__${className}--password`}>
          <input onChange={handlePassword} placeholder="Password" type="password" name="password"/>
        </div>
        <input className={`landing__${className}--submit`} type="submit" value={button} />
        <div>
          <span className={`landing__${className}--account`}>{message}{' '}<Link to={redirect}>{link}</Link></span>
        </div>
      </form>
    </div>
  )
}

export default Form;
