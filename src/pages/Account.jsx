import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';
import { formatPrice } from '../services/productService.js';
import { getMyOrders } from '../services/orderService.js';

export default function Account() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) getMyOrders(user.email).then(setOrders);
  }, [user]);

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl">My account</h1>
      <p className="mt-2 text-slate-600">
        {user.name} · {user.email}
      </p>
      <h2 className="mt-10 text-lg font-semibold">Orders</h2>
      {!orders.length && <p className="mt-3 text-sm text-slate-500">No orders yet.</p>}
      <ul className="mt-4 divide-y">
        {orders.map((o) => (
          <li key={o.id} className="flex items-center justify-between py-4 text-sm">
            <div>
              <p className="font-medium">{o.id}</p>
              <p className="text-slate-500">
                {o.status} · COD · {new Date(o.createdAt).toLocaleString()}
              </p>
            </div>
            <span>{formatPrice(o.total)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
