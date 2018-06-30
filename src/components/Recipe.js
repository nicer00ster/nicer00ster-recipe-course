import React from 'react';
import Single from './Single';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      single: false
    }
  }
  handleView() {
    this.setState({ single: !this.state.single });
  }
  render() {
    const { recipe } = this.props;
    return (
      <div>
        { this.state.single === true
         ? <Single uid={this.props.uid} recipe={recipe} />
         : null
        }
        <li className="recipe" onClick={() => this.handleView()}>
          <h4 className="recipe__label">{recipe.label}</h4>
          <img className="recipe__image" src={recipe.image} alt={recipe.label}/>
          <h6 className="recipe__source">{recipe.source}</h6>
        </li>
      </div>
    )
  }
}

export default Recipe;
