import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import { useCart } from '../context/CartContext.jsx';
import useAuth from '../hooks/useAuth.js';
import { formatPrice } from '../services/productService.js';
import { createOrder } from '../services/orderService.js';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    notes: '',
  });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!items.length) {
      setError('Your cart is empty.');
      return;
    }
    if (!form.name || !form.email || !form.phone || !form.address || !form.city) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const order = await createOrder({
        customer: { name: form.name, email: form.email, phone: form.phone, address: form.address, city: form.city },
        notes: form.notes,
        items,
        subtotal,
        shipping: subtotal >= 4000 ? 0 : 250,
        total: subtotal + (subtotal >= 4000 ? 0 : 250),
        paymentMethod: 'COD',
      });
      clearCart();
      navigate('/order-confirmation', { state: { order } });
    } catch (err) {
      setError(err.message || 'Could not place order.');
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2">
      <form onSubmit={submit} className="space-y-4">
        <h1 className="font-display text-3xl">Checkout</h1>
        <p className="text-sm text-slate-500">Guest checkout is available. Payment is Cash on Delivery only.</p>
        <Input label="Full name" name="name" value={form.name} onChange={onChange} required />
        <Input label="Email" type="email" name="email" value={form.email} onChange={onChange} required />
        <Input label="Phone" name="phone" value={form.phone} onChange={onChange} required />
        <Input label="Address" name="address" value={form.address} onChange={onChange} required />
        <Input label="City" name="city" value={form.city} onChange={onChange} required />
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-slate-700">Order notes</span>
          <textarea name="notes" value={form.notes} onChange={onChange} className="w-full rounded-md border px-3 py-2.5" rows={3} />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit">Place COD order</Button>
      </form>
      <aside className="rounded-lg bg-cream p-6">
        <h2 className="font-semibold">Order summary</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((i) => (
            <li key={i.key} className="flex justify-between gap-4">
              <span>
                {i.name} {i.variantName && `(${i.variantName})`} × {i.quantity}
              </span>
              <span>{formatPrice(i.price * i.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between text-sm">
          <span>Shipping</span>
          <span>{subtotal >= 4000 ? 'Free' : formatPrice(250)}</span>
        </p>
        <p className="mt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(subtotal + (subtotal >= 4000 ? 0 : 250))}</span>
        </p>
      </aside>
    </div>
  );
}
