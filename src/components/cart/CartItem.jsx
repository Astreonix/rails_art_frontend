import { formatPrice } from '../../services/productService.js';
import { useCart } from '../../context/CartContext.jsx';

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b py-4">
      <img src={item.image} alt={item.name} className="h-24 w-24 rounded object-cover" />
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">{item.name}</p>
          {item.variantName && <p className="text-sm text-slate-500">{item.variantName}</p>}
          <p className="mt-1 text-sm">{formatPrice(item.price)}</p>
        </div>
        <div className="mt-3 flex items-center gap-3 sm:mt-0">
          <div className="flex items-center overflow-hidden rounded border">
            <button type="button" className="px-3 py-1" onClick={() => updateQty(item.key, item.quantity - 1)}>
              −
            </button>
            <span className="min-w-8 text-center text-sm">{item.quantity}</span>
            <button type="button" className="px-3 py-1" onClick={() => updateQty(item.key, item.quantity + 1)}>
              +
            </button>
          </div>
          <p className="w-24 text-right font-semibold">{formatPrice(item.price * item.quantity)}</p>
          <button type="button" className="text-sm text-red-600" onClick={() => removeItem(item.key)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
