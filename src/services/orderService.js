import api, { hasApiBase } from './api.js';

const ORDERS_KEY = 'rails_art_orders';

export const createOrder = async (payload) => {
  if (hasApiBase) {
    const { data } = await api.post('/api/orders', payload);
    return data.order || data;
  }
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const order = {
    id: `RA${Date.now()}`,
    status: 'pending',
    paymentMethod: 'COD',
    createdAt: new Date().toISOString(),
    ...payload,
  };
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return order;
};

export const getOrders = async () => {
  if (hasApiBase) {
    const { data } = await api.get('/api/orders');
    return data.orders || data;
  }
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
};

export const getMyOrders = async (email) => {
  const orders = await getOrders();
  if (!email) return orders;
  return orders.filter((o) => o.customer?.email === email);
};

export const updateOrderStatus = async (id, status) => {
  if (hasApiBase) {
    const { data } = await api.patch(`/api/orders/${id}`, { status });
    return data.order || data;
  }
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const next = orders.map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
  return next.find((o) => o.id === id);
};
