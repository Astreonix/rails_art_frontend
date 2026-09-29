import { Link } from 'react-router-dom';
import { formatPrice } from '../../services/productService.js';
import { useCart } from '../../context/CartContext.jsx';
import Button from '../common/Button.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const inStock = (product.stock ?? 0) > 0;
  const defaultVariant = product.variants?.[0];

  return (
    <article className="group flex h-full flex-col border border-transparent p-2 hover:border-slate-200">
      <Link to={`/product/${product.id}`} className="relative block overflow-hidden bg-cream">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {!inStock && (
          <span className="absolute left-2 top-2 rounded bg-slate-800 px-2 py-1 text-[10px] uppercase text-white">
            Sold out
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-3">
        <p className="text-xs text-slate-400">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-medium hover:text-brand">
          {product.name}
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.compareAt > product.price && (
            <span className="text-xs text-slate-400 line-through">{formatPrice(product.compareAt)}</span>
          )}
        </div>
        <div className="mt-auto pt-3">
          {inStock ? (
            product.variants?.length > 1 ? (
              <Link
                to={`/product/${product.id}`}
                className="block rounded-full border border-ink py-2 text-center text-xs font-semibold uppercase tracking-wide hover:bg-ink hover:text-white"
              >
                Choose options
              </Link>
            ) : (
              <Button
                className="w-full"
                variant="dark"
                onClick={() => addItem(product, defaultVariant, 1)}
              >
                Add to cart
              </Button>
            )
          ) : (
            <Button className="w-full" variant="dark" disabled>
              Sold out
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
