import FavoriteRestarantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import swRegister from '../../utils/sw-register';

const Favorite = {
  async render() {
    return `
    <div class="content">
    <h2 class="content__heading"></h2>
    <div id="restaurants" class="restaurants">
    </div>
  </div>
    `;
  },

  async afterRender() {
    // Daftarkan service worker
    await swRegister();

    const restaurants = await FavoriteRestarantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML +=
        createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorite;
