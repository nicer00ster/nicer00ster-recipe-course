import React from 'react';
import Recipe from '../Recipe';
import PropTypes from 'prop-types';

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

Container.propTypes = {
  recipes: PropTypes.array
};

export default Container;
