import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import Donut from './Donut';
import Ingredients from './Ingredients';
import { saveRecipe, deleteRecipe } from '../../auth';
import bookmark from '../../svg/bookmark.svg';
import facebook from '../../svg/facebook.svg';
import twitter from '../../svg/twitter.svg';
import more from '../../svg/more.svg';
import trash from '../../svg/trash.svg';

const Single = ({ recipe, uid, single, closeModal }) => (
    <div>
       <Modal
        open={single}
        onClose={closeModal}
        closeIconSvgPath={''}
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
              ? <label><h6>Delete</h6><img onClick={() => { deleteRecipe(uid, recipe.key); closeModal() }} className="social__delete" src={trash} alt="Bookmark" /></label>
              : <label><h6>Bookmark</h6><img onClick={() => { saveRecipe(uid, recipe); closeModal() }} className="social__bookmark" src={bookmark} alt="Bookmark" /></label>
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
            <Donut calories={recipe.calories} digest={recipe.digest} yield={recipe.yield} />
          </div>
        </div>
      </Modal>
    </div>
);

Single.propTypes = {
  recipe: PropTypes.shape({
    yield: PropTypes.number,
    calories: PropTypes.number,
    key: PropTypes.string,
    label: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    digest: PropTypes.array,
  }),
  uid: PropTypes.string,
  single: PropTypes.bool,
  closeModal: PropTypes.func
}

export default Single;
