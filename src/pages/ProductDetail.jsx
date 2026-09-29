import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/common/Loader.jsx';
import Button from '../components/common/Button.jsx';
import VariantSelector from '../components/product/VariantSelector.jsx';
import { formatPrice, getProductById } from '../services/productService.js';
import { useCart } from '../context/CartContext.jsx';

const WHATSAPP_NUMBER = '923001234567';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(id).then((p) => {
      setProduct(p);
      setVariant(p?.variants?.[0] || null);
      setImage(p?.images?.[0] || '');
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader />;
  if (!product) {
    return (
      <div className="py-20 text-center">
        Product not found. <Link to="/shop" className="text-brand">Back to shop</Link>
      </div>
    );
  }

  const price = variant?.price ?? product.price;
  const stock = variant?.stock ?? product.stock;
  const inStock = stock > 0;
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Rails Art, I want to enquire about ${product.name} (${window.location.href})`
  )}`;

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-2">
      <div>
        <img src={image} alt={product.name} className="w-full rounded-lg bg-cream object-cover" />
        {product.images?.length > 1 && (
          <div className="mt-3 flex gap-2">
            {product.images.map((src) => (
              <button key={src} type="button" onClick={() => setImage(src)} className="h-16 w-16 overflow-hidden rounded border">
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400">{product.brand}</p>
        <h1 className="mt-2 font-display text-3xl">{product.name}</h1>
        <p className="mt-4 text-2xl font-semibold">{formatPrice(price)}</p>
        <p className="mt-4 text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="mt-6">
          <VariantSelector variants={product.variants} selectedId={variant?.id} onChange={setVariant} />
        </div>
        <p className="mt-4 text-sm">{inStock ? `${stock} in stock` : 'Out of stock'}</p>
        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center overflow-hidden rounded border">
            <button type="button" className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span className="min-w-8 text-center">{qty}</span>
            <button type="button" className="px-3 py-2" onClick={() => setQty((q) => q + 1)}>
              +
            </button>
          </div>
          <Button disabled={!inStock} onClick={() => addItem(product, variant, qty)}>
            Add to cart
          </Button>
        </div>
        <a href={wa} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium text-[#128C7E]">
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  );
}
