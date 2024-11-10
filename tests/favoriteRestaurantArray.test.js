import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContact';

// Menyimpan daftar restaurant favorit
let restaurantList = [];

// Object untuk mengelola daftar restaurant favorit
const FavoriteRestaurantArray = {
  // Mencari restaurant berdasarkan ID
  getRestaurant(id) {
    // Validasi: jika id kosong, langsung return undefined
    if (!id) {
      return;
    }

    // Mencari dan mengembalikan restaurant yang memiliki id yang sesuai
    return restaurantList.find((restaurant) => restaurant.id == id);
  },

  // Mengambil semua daftar restaurant favorit
  getAllRestaurants() {
    return restaurantList;
  },

  // Menambahkan restaurant ke daftar favorit
  putRestaurant(restaurant) {
    // Validasi: pastikan restaurant memiliki properti id
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // Validasi: pastikan restaurant dengan id tersebut belum ada dalam daftar
    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    // Menambahkan restaurant ke dalam daftar
    restaurantList.push(restaurant);
  },

  // Menghapus restaurant dari daftar favorit berdasarkan ID
  deleteRestaurant(id) {
    // Filter out restaurant dengan id yang sesuai
    restaurantList = restaurantList.filter((restaurant) => restaurant.id != id);
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  // Membersihkan daftar restaurant setelah setiap test
  afterEach(() => {
    restaurantList = [];
  });

  // Menjalankan test sesuai kontrak yang telah ditentukan
  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
