import React from 'react';
import Chart from './Chart';
import Ingredients from './Ingredients';
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
              <img className="social__bookmark" src={bookmark} alt="Bookmark" />
              <img className="social__facebook" src={facebook} alt="Facebook" />
              <img className="social__instagram" src={instagram} alt="Instagram" />
              <img className="social__twitter" src={twitter} alt="Twitter" />
            </div>
            <div className="source">
              <a className="source__button" target="_blank" href={recipe.url}>Get Recipe!</a>
              <h6 className="source__label">{recipe.source}</h6>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Single;
