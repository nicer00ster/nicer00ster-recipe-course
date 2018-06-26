import React from 'react';
import Recipe from './Recipe';

const Container = props => {
  let eachRecipe;
  eachRecipe = props.recipes.map((item, key) => {
    return (
      <Recipe
        key={key}
        label={item.recipe.label}
        image={item.recipe.image}
        url={item.recipe.url}
        source={item.recipe.source}
      />
    )
  })
  return (
    <div className="recipes__container">
      {eachRecipe}
    </div>
  )
}

export default Container;
