const assert = require('assert');

Feature('Restaurant Favorites Management');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('showing empty favorite restaurants initially', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement('#mainContent');
  I.see('restaurant favorites are displayed', '.content__heading');
  I.dontSeeElement(
    '.restaurant-item',
    'No restaurants should be favorited yet'
  );
});

Scenario('liking and verifying a restaurant in favorites', async ({ I }) => {
  // View restaurant list
  I.amOnPage('/');
  I.seeElement('.restaurant-item');

  // Store initial restaurant data
  const firstRestaurant = locate('.restaurant-item__content h3 a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  // Like the restaurant
  I.click(firstRestaurant);
  I.seeElement('#likeButton');

  // Click like button without checking specific text
  I.click('#likeButton');

  // Alternative ways to verify like button state:
  // Option 1: Check if aria-label changed
  I.seeAttributesOnElements('#likeButton', {
    'aria-label': 'unlike this restaurant',
  });

  // Verify in favorites page
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom(
    '.restaurant-item__content h3 a'
  );
  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  // Count number of favorites
  const favoriteRestaurants = await I.grabNumberOfVisibleElements(
    '.restaurant-item'
  );
  assert.strictEqual(
    favoriteRestaurants,
    1,
    'Should only have one favorite restaurant'
  );
});
