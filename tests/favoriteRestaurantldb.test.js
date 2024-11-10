import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContact';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    // Mengambil semua restaurant dari IndexedDB
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    // Menghapus setiap restaurant yang ada di database
    restaurants.forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  // Menjalankan test suite sesuai dengan kontrak yang telah ditentukan
  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
