import React from 'react';
import Recipe from './Recipe';

const Container = props => {
  let eachRecipe;
  eachRecipe = props.recipes.map((item, key) => {
    return (
      <Recipe key={key} recipe={item.recipe} />
    )
  });
  return (
    <div className="recipes__container">
      {eachRecipe}
    </div>
  )
}

export default Container;
