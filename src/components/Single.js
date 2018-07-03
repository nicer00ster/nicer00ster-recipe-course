import React from 'react';
import { saveRecipe, deleteRecipe } from '../auth';
import Chart from './Chart';
import Ingredients from './Ingredients';
import Modal from 'react-responsive-modal';
import bookmark from '../svg/bookmark.svg';
import facebook from '../svg/facebook.svg';
import twitter from '../svg/twitter.svg';
import more from '../svg/more.svg';
import trash from '../svg/trash.svg';

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
    console.log(this.props.recipe)
  }
  handleModal() {
    this.setState({
      openModal: !this.state.openModal
    })
  }
  render() {
    const { recipe, uid } = this.props;
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
            <div className="social">
              { recipe.key
                ? <label><h6>Delete</h6><img onClick={() => deleteRecipe(uid, recipe.key) && this.handleModal()} className="social__delete" src={trash} alt="Bookmark" /></label>
                : <label><h6>Bookmark</h6><img onClick={() => saveRecipe(uid, recipe) && this.handleModal()} className="social__bookmark" src={bookmark} alt="Bookmark" /></label>
              }
              <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${recipe.url}`}>
                <img className="social__facebook" src={facebook} alt="Facebook" />
              </a>
              <a target="_blank" href={`http://twitter.com/home?status=Check out this awesome recipe! ${recipe.url}`}>
                <img className="social__twitter" src={twitter} alt="Twitter" />
              </a>
              <a target="_blank" href={recipe.url}>
                <img className="social__more" src={more} alt="Original Recipe" />
              </a>
            </div>
            <h4 className="single__label">{recipe.label}</h4>
            <img className="single__image" src={recipe.image} alt={recipe.label} />
            <div className="single__section">
              <Ingredients recipe={recipe} />
              <Chart calories={recipe.calories} digest={recipe.digest} yield={recipe.yield} />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Single;
