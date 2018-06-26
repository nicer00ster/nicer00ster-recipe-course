import React from 'react';

const Recipe = props => {
  return (
    <li className="recipe">
      <h4 className="recipe__label">{props.label}</h4>
      <img className="recipe__image" src={props.image} alt={props.label}/>
      <h6 className="recipe__source">{props.source}</h6>
    </li>
  )
}

export default Recipe;
