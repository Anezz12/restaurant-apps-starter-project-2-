const assert = require('assert');

Feature('Unliking Restaurants');

Before(({ I }) => {
  // Start at home page for each test
  I.amOnPage('/');
});

Scenario('unliking one restaurant', async ({ I }) => {
  // Ensure there's a restaurant to like first
  I.seeElement('.restaurant-item');
  // Step 1: Like the restaurant
  const firstRestaurant = locate('.restaurant-item__content h3 a').first();
  const restaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Step 2: Verify it appears in favorites
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const favoritedTitle = await I.grabTextFrom('.restaurant-item__content h3 a');
  assert.strictEqual(restaurantTitle, favoritedTitle);

  // Step 3: Unlike the restaurant
  I.click(locate('.restaurant-item__content h3 a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Step 4: Verify it's removed from favorites
  I.amOnPage('/#/favorite');
  I.see('restaurant favorites are displayed', '.content__heading');
  I.dontSeeElement('.restaurant-item');
});
