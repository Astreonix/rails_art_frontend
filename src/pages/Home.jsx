import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid.jsx';
import Loader from '../components/common/Loader.jsx';
import { CATEGORIES, getProducts } from '../services/productService.js';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((list) => {
      setProducts(list.slice(0, 8));
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden bg-black text-white">
        <img
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-6 py-24 md:py-36">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Rails Art</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl leading-tight md:text-6xl">Office &amp; Art Accessories</h1>
          <p className="mt-4 max-w-lg text-sm text-white/80 md:text-base">
            Premium stationery and fine-arts supplies that combine function, durability, and style — because your
            workspace matters.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink hover:bg-cream"
          >
            Shop now
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl">Our collections</h2>
          <Link to="/shop" className="text-sm text-brand">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/shop?category=${c.slug}`}
              className="rounded-lg bg-cream px-3 py-8 text-center text-sm font-medium hover:bg-cream-dark"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <h2 className="mb-6 text-xl">Featured products</h2>
        {loading ? <Loader /> : <ProductGrid products={products} />}
      </section>

      <section className="border-y bg-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Free shipping', 'Shop for Rs 4,000 and get free shipping'],
            ['Cash on Delivery', 'Secure COD checkout at launch'],
            ['Support', 'WhatsApp help on every page'],
            ['Self-managed stock', 'Admin can add or mark products out of stock'],
          ].map(([title, copy]) => (
            <div key={title}>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
