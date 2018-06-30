import React from 'react';
import Chart from './Chart';
import Ingredients from './Ingredients';
import Modal from 'react-responsive-modal';
import { saveRecipe } from '../auth';
import bookmark from '../icons/bookmark.svg';
import facebook from '../icons/facebook.svg';
import twitter from '../icons/twitter.svg';
import more from '../icons/more.svg';

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
    console.log(window.location.pathname);
  }
  handleModal() {
    this.setState({
      openModal: !this.state.openModal
    })
  }
  render() {
    const { recipe } = this.props;
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
              <Ingredients recipe={recipe} />
              <Chart calories={recipe.calories} digest={recipe.digest} yield={recipe.yield} />
            </div>
            <div className="social">
              {window.location.pathname === '/dashboard'}
              <img onClick={() => saveRecipe(this.props.uid, recipe)} className="social__bookmark" src={bookmark} alt="Bookmark" />
              <div className="fb-share-button" data-href={recipe.url} data-layout="button" data-size="large" data-mobile-iframe="true">
                <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${recipe.url}`} className="fb-xfbml-parse-ignore">
                <img className="social__facebook" src={facebook} alt="Facebook" />
                </a>
              </div>
              <a target="_blank" href={`http://twitter.com/home?status=Check out this awesome recipe! ${recipe.url}`}>
                <img className="social__twitter" src={twitter} alt="Twitter" />
              </a>
              <a target="_blank" href={recipe.url}>
                <img className="social__more" src={more} alt="Original Recipe" />
              </a>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Single;
