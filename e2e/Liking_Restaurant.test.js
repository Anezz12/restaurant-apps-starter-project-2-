const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('showing empty favorite restaurants', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement('#mainContent');
  I.see('restaurant favorites are displayed', '.content__heading');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.seeElement('.restaurant-item');
  const firstRestaurant = locate('.restaurant-item__content h3 a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  const likedRestaurantTitle = await I.grabTextFrom(
    '.restaurant-item__content h3 a'
  );
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
