import api, { hasApiBase } from './api.js';

const CART_KEY = 'rails_art_cart';

export const getCart = async () => {
  if (hasApiBase) {
    try {
      const { data } = await api.get('/api/cart');
      return data.items || data;
    } catch {
      /* fallback */
    }
  }
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
};

export const saveCart = async (items) => {
  if (hasApiBase) {
    try {
      await api.put('/api/cart', { items });
    } catch {
      /* keep local copy */
    }
  }
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  return items;
};
