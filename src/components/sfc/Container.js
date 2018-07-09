import React from 'react';
import Recipe from '../Recipe';


const Container = props => (
  <div className="recipes__container">
    { props.recipes.length === 0 &&
        <div className="recipes__container-empty">
          Your recipes will show up here once you've added some.
        </div>
    }
    { props.recipes.map((item, key) => {
      return (
        <Recipe key={key} uid={props.uid} recipe={item.recipe} />
       )
      })}
  </div>
)

export default Container;
