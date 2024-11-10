import restaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import generateSkeletonLoader from '../templates/skeleton-Loader';
import { initSwalError } from '../../utils/swal-initiator';

const Home = {
  async render() {
    return `
      <hero-bar></hero-bar>
      <highlight-bar></highlight-bar>
      <div class="explore">
        <h1 class="explore_label">Explore Restaurants</h1>
        <hr style="width: 30%; border: 3px solid #de9d7e; margin: auto" />
      </div>
      <div id="loading-container" class="loading-container">
        ${generateSkeletonLoader(6)}
      </div>
      <div id="restaurants" class="restaurants">
      </div>
      <feature-dishes></feature-dishes>
    `;
  },
  async afterRender() {
    try {
      const loadingContainer = document.querySelector('#loading-container');
      const restaurantsContainer = document.querySelector('#restaurants');
      loadingContainer.style.display = 'block';
      restaurantsContainer.style.display = 'none';

      const restaurants = await restaurantSource.home();

      loadingContainer.style.display = 'none';
      restaurantsContainer.style.display = 'grid';

      if (!restaurants || restaurants.length === 0) {
        throw new Error('No restaurants found');
      }

      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      document.querySelector('#loading-container').style.display = 'none';
      initSwalError({
        title: 'Error Loading Restaurants',
        text:
          error.message ||
          'Failed to load restaurants. Please try again later.',
        confirmButtonText: 'Retry',
      }).then((result) => {
        if (result.isConfirmed) {
          this.afterRender();
        }
      });
    }
  },
};

export default Home;
