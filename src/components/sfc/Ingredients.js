import React from 'react';

const Ingredients = props => (
    <ul className="single__ingredients">
      <h3>Ingredients</h3>
      <h4>Makes {props.recipe.yield} servings</h4>
      { props.recipe.ingredients.map((item, key) => {
        return (
          <label className="single__ingredients-item" key={key}>
            {item.text}
            <input type="checkbox"/>
            <span className="checkmark"></span>
          </label>
        )
      })}
    </ul>


)

export default Ingredients;
