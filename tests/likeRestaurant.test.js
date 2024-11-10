import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helper/testFactoreies.js';
import { describe, it, expect, beforeEach } from '@jest/globals';

/**
 * Test Suite untuk fitur Like Restaurant
 * Menguji fungsionalitas tombol like dan interaksi dengan IndexedDB
 */
describe('Liking A Restaurant', () => {
  /**
   * Membuat container untuk tombol like
   * Container ini akan di-reset sebelum setiap test
   */
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  /**
   * Setup awal sebelum setiap test case
   */
  beforeEach(() => {
    addLikeButtonContainer();
  });

  /**
   * Test Case 1: Memastikan tombol like muncul untuk restaurant yang belum dilike
   */
  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });

  /**
   * Test Case 2: Memastikan tombol unlike tidak muncul untuk restaurant yang belum dilike
   */
  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeFalsy();
  });

  /**
   * Test Case 3: Memastikan restaurant bisa dilike
   * dan tersimpan di database
   */
  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // Simulasi klik tombol like
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Verifikasi restaurant tersimpan di database
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    // Cleanup: Hapus data test dari database
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  /**
   * Test Case 4: Memastikan tidak ada duplikasi data
   * ketika melike restaurant yang sudah dilike
   */
  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // Tambahkan restaurant ke database
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    // Simulasi klik tombol like
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Verifikasi tidak ada duplikasi data
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([
      { id: 1 },
    ]);

    // Cleanup: Hapus data test
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  /**
   * Test Case 5: Memastikan validasi ID restaurant
   * Restaurant tanpa ID tidak boleh bisa dilike
   */
  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    // Simulasi klik tombol like
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Verifikasi tidak ada data yang tersimpan
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
