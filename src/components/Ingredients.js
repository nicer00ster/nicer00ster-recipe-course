import React from 'react';

const Ingredients = props => {
  let ingredients;

  ingredients = props.recipe.ingredients.map((item, key) => {
    return (
      <label className="single__ingredients-item" key={key}>
        {item.text}
        <input type="checkbox"/>
        <span className="checkmark"></span>
      </label>
    )
  });
  return (
    <ul className="single__ingredients">
      <h3>Ingredients</h3>
      {ingredients}
    </ul>
  )
}
export default Ingredients;
