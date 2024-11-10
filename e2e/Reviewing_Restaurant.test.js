Feature('Review Restaurant');

const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('post a restaurant review successfully', async ({ I }) => {
  const reviewData = {
    name: 'E2E Test Review',
    content: 'E2E Post Review text',
  };

  // Navigate to restaurant detail
  I.amOnPage('/');
  I.waitForElement('.restaurant-item__content', 10);
  I.seeElement('.restaurant-item__content');
  I.click(locate('.restaurant-item__content a').first());

  // Wait for detail page to load
  I.waitForElement('.restaurant__title', 10);
  I.see('Detail Restaurant');

  // Wait for reviews section and form
  I.waitForElement('#review-form', 10);
  I.seeElement('#review-form');

  // Submit new review
  I.fillField('#review-name', reviewData.name);
  I.fillField('#review-content', reviewData.content);
  I.click('#submit-review');

  // Verify new review appears
  I.waitForElement('.review', 10);
  I.see(reviewData.name, '.name-review');
  I.see(reviewData.content, '.description-review');

  // Check form is reset
  const nameField = await I.grabValueFrom('#review-name');
  const contentField = await I.grabValueFrom('#review-content');
  assert.equal(nameField, '');
  assert.equal(contentField, '');
});

Scenario('cannot submit empty review', async ({ I }) => {
  // Rest of the code remains the same
});
