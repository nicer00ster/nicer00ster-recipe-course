import React from 'react';
import Chart from './Chart';
import Modal from 'react-responsive-modal';
import bookmark from '../icons/bookmark.svg';
import facebook from '../icons/facebook.svg';
import instagram from '../icons/instagram.svg';
import twitter from '../icons/twitter.svg';

class Single extends React.Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      openModal: false
    }
  }
  componentDidMount() {
    this.setState({ openModal: true })
  }
  handleModal() {
    this.setState({
      openModal: !this.state.openModal
    })
  }
  render() {
    const { recipe } = this.props;

    let ingredients;
    ingredients = recipe.ingredients.map((item, key) => {
      return (
        <label className="single__ingredients-item" key={key}>
          {item.text}
          <input type="checkbox"/>
          <span className="checkmark"></span>
        </label>
      )
    })
    return (
      <div>
         <Modal
          open={this.state.openModal}
          onClose={this.handleModal}
          closeIconSvgPath={''}
          closeOnOverlayClick={false}
          closeIconSize={48}
          classNames={{
            overlay: 'recipe__single-overlay',
            modal: 'recipe__single-modal',
            closeButton: 'recipe__single-close',
            closeIcon: 'recipe__single-icon',
          }}>
          <div className="single">
            <h4 className="single__label">{recipe.label}</h4>
            <img className="single__image" src={recipe.image} alt={recipe.label} />
            <div className="single__section">
              <ul className="single__ingredients">
                <h3>Ingredients</h3>
                {ingredients}
              </ul>
              <Chart calories={recipe.calories} digest={recipe.digest} yield={recipe.yield} />
            </div>
            <div className="social">
              <img className="social__bookmark" src={bookmark} alt="Bookmark" />
              <img className="social__facebook" src={facebook} alt="Facebook" />
              <img className="social__instagram" src={instagram} alt="Instagram" />
              <img className="social__twitter" src={twitter} alt="Twitter" />
            </div>
            <a className="single__source" target="_blank" href={recipe.url}>Get Recipe!</a>
            <h6 className="single__source">{recipe.source}</h6>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Single;
