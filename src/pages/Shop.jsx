import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid.jsx';
import Loader from '../components/common/Loader.jsx';
import { CATEGORIES, getProducts } from '../services/productService.js';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = params.get('category') || 'all';
  const q = params.get('q') || '';
  const sort = params.get('sort') || 'name-asc';

  useEffect(() => {
    setLoading(true);
    getProducts({ category, search: q, sort }).then((list) => {
      setProducts(list);
      setLoading(false);
    });
  }, [category, q, sort]);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <p className="text-sm text-slate-500">Home / All products</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-3xl font-display">All products</h1>
        <div className="flex flex-wrap gap-3 text-sm">
          <select value={category} onChange={(e) => update('category', e.target.value)} className="rounded border px-3 py-2">
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <select value={sort} onChange={(e) => update('sort', e.target.value)} className="rounded border px-3 py-2">
            <option value="name-asc">Alphabetically, A-Z</option>
            <option value="name-desc">Alphabetically, Z-A</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </div>
      </div>
      {q && <p className="mt-3 text-sm text-slate-500">Search results for “{q}”</p>}
      <div className="mt-8">{loading ? <Loader /> : <ProductGrid products={products} />}</div>
    </div>
  );
}
