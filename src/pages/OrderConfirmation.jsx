import { Link, useLocation } from 'react-router-dom';
import { formatPrice } from '../services/productService.js';

export default function OrderConfirmation() {
  const order = useLocation().state?.order;

  if (!order) {
    return (
      <div className="py-20 text-center">
        No order to show. <Link to="/shop" className="text-brand">Shop</Link>
      </div>
    );
  }

  const wa = `https://wa.me/923001234567?text=${encodeURIComponent(`Hi Rails Art, I have a question about order ${order.id}`)}`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <p className="text-sm uppercase tracking-widest text-brand">Thank you</p>
      <h1 className="mt-2 font-display text-4xl">Order confirmed</h1>
      <p className="mt-4 text-slate-600">
        Order <strong>{order.id}</strong> has been placed with Cash on Delivery. Total {formatPrice(order.total)}.
      </p>
      <p className="mt-2 text-sm text-slate-500">A confirmation will be sent to {order.customer?.email}.</p>
      <div className="mt-8 flex justify-center gap-4">
        <Link to="/shop" className="rounded-full bg-brand px-5 py-2.5 text-sm text-white">
          Continue shopping
        </Link>
        <a href={wa} target="_blank" rel="noreferrer" className="rounded-full border px-5 py-2.5 text-sm">
          WhatsApp about this order
        </a>
      </div>
    </div>
  );
}
