import React from 'react';
import Single from './sfc/Single';
import PropTypes from 'prop-types';

class Recipe extends React.Component {
  static propTypes = {
    recipe: PropTypes.shape({
      label: PropTypes.string,
      image: PropTypes.string,
      source: PropTypes.string
    }),
    uid: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      single: false
    }
  }
  onSingleView = () => {
    this.setState({ single: !this.state.single });
  }
  render() {
    const { recipe, uid } = this.props;
    const { single } = this.state;
    return (
      <div>
        { this.state.single === true
         ? <Single uid={uid} recipe={recipe} single={single} closeModal={this.onSingleView} />
         : null
        }
        <li className="recipe" onClick={this.onSingleView}>
          <h4 className="recipe__label">{recipe.label}</h4>
          <img className="recipe__image" src={recipe.image} alt={recipe.label}/>
          <h6 className="recipe__source">{recipe.source}</h6>
        </li>
      </div>
    )
  }
}

export default Recipe;
