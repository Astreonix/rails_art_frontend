import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import Loader from '../../components/common/Loader.jsx';
import { formatPrice } from '../../services/productService.js';
import { getOrders, updateOrderStatus } from '../../services/orderService.js';

const STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrders() {
  const { user, loading, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);

  const reload = () => getOrders().then(setOrders);

  useEffect(() => {
    reload();
  }, []);

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/account" replace />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl">Orders</h1>
      {!orders.length && <p className="mt-6 text-sm text-slate-500">No orders yet.</p>}
      <ul className="mt-6 space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="rounded-lg border p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{o.id}</p>
                <p className="text-sm text-slate-500">
                  {o.customer?.name} · {o.customer?.email} · {o.customer?.phone}
                </p>
                <p className="text-sm text-slate-500">
                  {o.customer?.address}, {o.customer?.city}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(o.total)}</p>
                <p className="text-xs text-slate-500">{o.paymentMethod}</p>
              </div>
            </div>
            <select
              className="mt-3 rounded border px-3 py-2 text-sm"
              value={o.status}
              onChange={async (e) => {
                await updateOrderStatus(o.id, e.target.value);
                reload();
              }}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
