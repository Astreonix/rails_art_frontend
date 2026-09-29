import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import Loader from '../../components/common/Loader.jsx';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';
import {
  CATEGORIES,
  deleteProduct,
  formatPrice,
  getProducts,
  saveProduct,
} from '../../services/productService.js';

const empty = {
  name: '',
  brand: 'Rails Art',
  category: 'fine-arts',
  price: '',
  stock: '',
  images: '',
  description: '',
};

export default function AdminProducts() {
  const { user, loading, isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const reload = () => getProducts().then(setProducts);

  useEffect(() => {
    reload();
  }, []);

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/account" replace />;

  const submit = async (e) => {
    e.preventDefault();
    const images = form.images
      ? form.images.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    await saveProduct({
      id: editingId || undefined,
      name: form.name,
      brand: form.brand,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      compareAt: 0,
      description: form.description,
      images,
      variants: [
        {
          id: editingId ? `${editingId}-std` : `v${Date.now()}`,
          name: 'Standard',
          price: Number(form.price),
          stock: Number(form.stock),
        },
      ],
    });
    setForm(empty);
    setEditingId(null);
    reload();
  };

  const edit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      stock: p.stock,
      images: (p.images || []).join(', '),
      description: p.description || '',
    });
  };

  const markOut = async (p) => {
    await saveProduct({
      ...p,
      stock: 0,
      variants: (p.variants || []).map((v) => ({ ...v, stock: 0 })),
    });
    reload();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl">Products</h1>
      <form onSubmit={submit} className="mt-6 grid gap-3 rounded-lg border p-4 md:grid-cols-2">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input label="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-700">Category</span>
          <select
            className="w-full rounded-md border px-3 py-2.5"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <Input label="Price (Rs)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <Input label="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
        <Input
          label="Image URLs (comma separated)"
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
        />
        <label className="block text-sm md:col-span-2">
          <span className="mb-1.5 block font-medium text-slate-700">Description</span>
          <textarea
            className="w-full rounded-md border px-3 py-2.5"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <div className="md:col-span-2">
          <Button type="submit">{editingId ? 'Update product' : 'Add product'}</Button>
        </div>
      </form>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-3">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.category}</p>
                </td>
                <td>{formatPrice(p.price)}</td>
                <td>{p.stock}</td>
                <td className="space-x-3 text-right">
                  <button type="button" className="text-brand" onClick={() => edit(p)}>
                    Edit
                  </button>
                  <button type="button" className="text-amber-700" onClick={() => markOut(p)}>
                    Out of stock
                  </button>
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={async () => {
                      await deleteProduct(p.id);
                      reload();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
