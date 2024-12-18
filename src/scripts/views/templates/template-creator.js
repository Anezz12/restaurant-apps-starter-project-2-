/* eslint-disable indent */
import CONFIG from '../../globals/config';

// Helper function to create list items from array
const createListItems = (items, propertyName = 'name') =>
  items.map((item) => `<li>${item[propertyName]}</li>`).join('');

// Component for customer review
const createReviewItem = ({ name, date, review }) => `
  <li class="review">
    <div class="name-review">${name}</div>
    <div class="date-review">${date}</div>
    <div class="description-review">"${review}"</div>
  </li>
`;

// Helper to create restaurant info section
const createRestaurantInfo = ({ name, address, city, rating }) => `
  <div class="restaurant__info">
  <div>
    <h4>Restaurant</h4>
     <p>${name}</p>
  </div>
  <div>
    <h4>Address</h4>
    <p>${address}</p>
  </div>
  <div>
    <h4>City</h4>
    <p>${city}</p>
  </div>
  <div>
    <h4>Rating</h4>
   <p>${rating}⭐️</p>
  </div>
</div>
`;

// Helper to create menu section
const createMenuSection = (restaurant) => `
  <div class="restaurant-menu">
    <h4 class="restaurant-label">Categories</h4>
    <ul class="menus">${createListItems(restaurant.categories)}</ul>
    
    <h4 class="restaurant-label">Foods Menu</h4>
    <ul class="menus">${createListItems(restaurant.menus.foods)}</ul>
    
    <h4 class="restaurant-label">Drinks Menu</h4>
    <ul class="menus">${createListItems(restaurant.menus.drinks)}</ul>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__title">Detail Restaurant</h2>
  
  <div class="restaurant__wrap">
    <img 
      class="restaurant__poster" 
      src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
      alt="${restaurant.name}"
    />
    ${createRestaurantInfo(restaurant)}
  </div>

  <div class="restaurant__overview">
    <p>${restaurant.description}</p>
  </div>

  ${createMenuSection(restaurant)}

  <div class="restaurant__overview">
    <h1 class="review-label">Customer Reviews</h1>
    <ul class="review-boxs">
      ${restaurant.customerReviews.map(createReviewItem).join('')}
    </ul>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <picture>
        <source data-srcset="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}">
        <img
          class="restaurant-item__header__poster lazyload"
          data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}"
          alt="${restaurant.name}"
        >
      </picture>
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${
          restaurant.rating
        }</span></p>
      </div>
      <div class="restaurant-item__header__city">
        <p>${restaurant.city}</p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant_title">
        <a href="/#/detail/${restaurant.id}">${restaurant.name}</a>
      </h3>
      <p>${restaurant.description}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
