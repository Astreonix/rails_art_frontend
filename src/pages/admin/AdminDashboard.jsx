import { Link, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import Loader from '../../components/common/Loader.jsx';

export default function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/account" replace />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl">Admin dashboard</h1>
      <p className="mt-2 text-slate-600">Manage catalog and orders without developer help.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link to="/admin/products" className="rounded-lg border p-6 hover:border-brand">
          <h2 className="font-semibold">Products</h2>
          <p className="mt-2 text-sm text-slate-500">Add, edit, delete, and mark items out of stock.</p>
        </Link>
        <Link to="/admin/orders" className="rounded-lg border p-6 hover:border-brand">
          <h2 className="font-semibold">Orders</h2>
          <p className="mt-2 text-sm text-slate-500">Review COD orders and update status.</p>
        </Link>
      </div>
    </div>
  );
}
