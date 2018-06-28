import React from 'react';
import Recipe from './Recipe';
import SingleView from './SingleView';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.handleView = this.handleView.bind(this);
  }
  handleView() {
    return (
      <div>
        <SingleView />
      </div>
    )
  }
  render() {
    let eachRecipe;
    eachRecipe = this.props.recipes.map((item, key) => {
      return (
        <Recipe
          key={key}
          label={item.recipe.label}
          image={item.recipe.image}
          url={item.recipe.url}
          source={item.recipe.source}
          view={this.handleView}
          onClick={() => this.handleView()}
        />
      )
    })
    return (
      <div className="recipes__container">
        {eachRecipe}
      </div>
    )
  }


}

export default Container;
