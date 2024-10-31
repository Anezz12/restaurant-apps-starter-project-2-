import restaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import Spinner from '../templates/spinner';
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
        ${Spinner}
      </div>
      <div id="restaurants" class="restaurants">
      </div>
      <feature-dishes></feature-dishes>
      <testimonial-section></testimonial-section>
    `;
  },

  async afterRender() {
    try {
      // Show loading spinner
      const loadingContainer = document.querySelector('#loading-container');
      const restaurantsContainer = document.querySelector('#restaurants');
      loadingContainer.style.display = 'flex';
      restaurantsContainer.style.display = 'none';

      // Fetch restaurants data
      const restaurants = await restaurantSource.home();

      // Hide loading spinner
      loadingContainer.style.display = 'none';
      restaurantsContainer.style.display = 'grid';

      // Check if restaurants data exists and is not empty
      if (!restaurants || restaurants.length === 0) {
        throw new Error('No restaurants found');
      }

      // Render restaurants
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      // Hide loading spinner
      document.querySelector('#loading-container').style.display = 'none';

      // Show error message using SweetAlert
      initSwalError({
        title: 'Error Loading Restaurants',
        text:
          error.message ||
          'Failed to load restaurants. Please try again later.',
        confirmButtonText: 'Retry',
      }).then((result) => {
        if (result.isConfirmed) {
          // Retry loading restaurants
          this.afterRender();
        }
      });
    }
  },
};

export default Home;
