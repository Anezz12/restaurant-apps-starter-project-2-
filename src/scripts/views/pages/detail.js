import UrlParser from '../../routes/url-parser';
import restaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import PostReview from '../../utils/add-review';
import { initSwalError, initSwalSuccess } from '../../utils/swal-initiator';

const Detail = {
  async render() {
    return `
      <div>
        <div id="loading"></div>
        <div id="restaurant" class="restaurant"></div>
        <div id="customerReviews"></div>
        <div id="likeButtonContainer"></div>
        <form id="review-form">
          <h3>Add Review</h3>
          <input type="text" id="review-name" placeholder="Your Name" autocomplete="on" required>
          <input type="text" id="review-content" placeholder="Your Review" autocomplete="on" required>
          <button type="submit" class="submit-review" id="submit-review">Send Review</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await restaurantSource.restaurantDetail(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        description: restaurant.description,
      },
    });

    const submitReview = document.getElementById('submit-review');
    submitReview.addEventListener('click', async (event) => {
      event.preventDefault();
      try {
        await PostReview();
        initSwalSuccess('Review submitted successfully!', 'success');
      } catch (error) {
        initSwalError('Error submitting review', error);
      }
    });
  },
};

export default Detail;
