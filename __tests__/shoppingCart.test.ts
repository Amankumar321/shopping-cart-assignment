import axios from 'axios';
import ShoppingCart from '../shoppingCart'
import { describe, test, expect, beforeEach, jest } from '@jest/globals';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
    mockedAxios.get.mockReset();
  });

  test('adds products and calculates totals correctly', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { price: 2.52 } });
    mockedAxios.get.mockResolvedValueOnce({ data: { price: 2.52 } });
    mockedAxios.get.mockResolvedValueOnce({ data: { price: 9.98 } });

    await cart.addProduct('cornflakes', 1);
    await cart.addProduct('cornflakes', 1);
    await cart.addProduct('weetabix', 1);

    const state = cart.getCartState();
    expect(state.items.length).toBe(2);
    expect(state.subtotal).toBe(15.02);
    expect(state.tax).toBe(1.88);
    expect(state.total).toBe(16.90);
  });

  test('throws error when API call fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'));
    await expect(cart.addProduct('cornflakes', 1)).rejects.toThrow('Error fetching price for cornflakes');
  });
});