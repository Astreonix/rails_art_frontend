import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem.jsx';
import Button from '../components/common/Button.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../services/productService.js';

export default function Cart() {
  const { items, subtotal } = useCart();

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl">Your cart is empty</h1>
        <Link to="/shop" className="mt-6 inline-block text-brand">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-3xl">Cart</h1>
      <div className="mt-6">
        {items.map((item) => (
          <CartItem key={item.key} item={item} />
        ))}
      </div>
      <div className="mt-8 flex flex-col items-end gap-3">
        <p className="text-lg">
          Subtotal: <strong>{formatPrice(subtotal)}</strong>
        </p>
        <p className="text-sm text-slate-500">Shipping calculated at checkout. Payment method: Cash on Delivery.</p>
        <Link to="/checkout">
          <Button>Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
