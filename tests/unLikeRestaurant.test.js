import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helper/testFactoreies.js';

/**
 * Test Suite untuk fitur Unlike Restaurant
 * Menguji fungsionalitas tombol unlike dan penghapusan data dari IndexedDB
 */
describe('Unliking A Restaurant', () => {
  /**
   * Membuat container untuk tombol like/unlike
   * Container ini akan di-reset sebelum setiap test
   */
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  /**
   * Setup awal sebelum setiap test case
   * - Membuat container untuk tombol
   * - Menambahkan restaurant ke daftar favorit
   */
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  /**
   * Cleanup setelah setiap test case
   * Menghapus data restaurant dari database
   */
  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  /**
   * Test Case 1: Memastikan tombol unlike muncul untuk restaurant yang sudah dilike
   */
  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  /**
   * Test Case 2: Memastikan tombol like tidak muncul untuk restaurant yang sudah dilike
   */
  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });

  /**
   * Test Case 3: Memastikan restaurant bisa dihapus dari daftar favorit
   */
  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // Simulasi klik tombol unlike
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    // Verifikasi restaurant telah dihapus dari database
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  /**
   * Test Case 4: Memastikan tidak ada error saat unlike restaurant yang sudah tidak ada di database
   * Menangani kasus edge case untuk mencegah error
   */
  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // Hapus restaurant dari database
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    // Simulasi klik tombol unlike
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    // Verifikasi tidak ada error dan database tetap kosong
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
