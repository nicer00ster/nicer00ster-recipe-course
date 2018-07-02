import React from 'react';
import Recipe from './Recipe';


const Container = props => {
  let eachRecipe;
  eachRecipe = props.recipes.map((item, key) => {
    return (
      <Recipe key={key} uid={props.uid} recipe={item.recipe} />
    )
  });
  return (
    <div className="recipes__container">
      {props.recipes.length === 0
        ? <div className="recipes__container-empty">
            Your recipes will show up here once you've added some.
          </div>
        : null
      }
      {eachRecipe}
    </div>
  )
}

export default Container;
