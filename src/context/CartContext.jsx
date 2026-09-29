import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as cartService from '../services/cartService.js';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    cartService.getCart().then(setItems);
  }, []);

  const persist = (updater) => {
    setItems((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      cartService.saveCart(next);
      return next;
    });
  };

  const addItem = (product, variant, quantity = 1) => {
    const variantId = variant?.id || 'default';
    const price = variant?.price ?? product.price;
    const key = `${product.id}-${variantId}`;
    persist((current) => {
      const existing = current.find((i) => i.key === key);
      if (existing) {
        return current.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [
        ...current,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.images?.[0],
          variantId,
          variantName: variant?.name || '',
          price,
          quantity,
          stock: variant?.stock ?? product.stock,
        },
      ];
    });
  };

  const removeItem = (key) => persist((current) => current.filter((i) => i.key !== key));

  const updateQty = (key, quantity) => {
    if (quantity < 1) return removeItem(key);
    persist((current) => current.map((i) => (i.key === key ? { ...i, quantity } : i)));
  };

  const clearCart = () => persist([]);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = useMemo(
    () => ({ items, addItem, updateQty, removeItem, clearCart, count, subtotal }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
