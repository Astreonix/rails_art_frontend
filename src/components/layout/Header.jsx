import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import { useCart } from '../../context/CartContext.jsx';
import { CATEGORIES } from '../../services/productService.js';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [open, setOpen] = useState(false);

  const submitSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (category !== 'all') params.set('category', category);
    navigate(`/shop?${params.toString()}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-brand-dark px-4 py-2 text-center text-xs text-white sm:text-sm">
        Cash on Delivery available. Pay in advance for extra savings. Nationwide delivery across Pakistan.
      </div>

      <div className="border-b border-cream-dark bg-cream">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Link to="/" className="shrink-0 text-center leading-none">
            <span className="font-display text-2xl font-bold text-red-800">Rails Art</span>
            <span className="mt-0.5 block text-[10px] tracking-[0.2em] text-brand">FINE ARTS &amp; STATIONERY</span>
          </Link>

          <form onSubmit={submitSearch} className="hidden flex-1 items-center md:flex">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-11 flex-1 rounded-l-full border border-r-0 border-slate-300 bg-white px-4 text-sm"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 border border-slate-300 bg-white px-2 text-sm text-slate-600"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="flex h-11 w-12 items-center justify-center rounded-r-full bg-brand text-white"
              aria-label="Search"
            >
              ⌕
            </button>
          </form>

          <div className="ml-auto flex items-center gap-5 text-sm">
            {user ? (
              <div className="hidden items-center gap-3 sm:flex">
                <Link to="/account" className="hover:text-brand">
                  {user.name}
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-brand">
                    Admin
                  </Link>
                )}
                <button type="button" onClick={logout} className="text-slate-500 hover:text-ink">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden items-center gap-2 sm:flex hover:text-brand">
                <span className="text-lg">👤</span> My account
              </Link>
            )}
            <Link to="/cart" className="relative flex items-center gap-2 hover:text-brand">
              <span className="text-xl text-brand">🛒</span>
              <span>Cart</span>
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] text-white">
                  {count}
                </span>
              )}
            </Link>
            <button type="button" className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              ☰
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden border-b border-cream-dark bg-white md:block">
        <ul className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-4 py-3 text-sm font-medium">
          <li>
            <Link to="/shop?sort=price-asc" className="hover:text-brand">
              Deals
            </Link>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link to={`/shop?category=${c.slug}`} className="hover:text-brand">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="overflow-hidden bg-brand-dark py-2 text-xs text-white">
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-10">
                <span>Unleash your creativity with our premium art collection</span>
                <span>From school supplies to office essentials — we have it all</span>
                <span>Exclusive discounts on selected art materials</span>
                <span>Your one-stop shop for fine arts and stationery</span>
                <span>Cash on Delivery across Pakistan</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="space-y-3 border-b bg-white px-4 py-4 md:hidden">
          <form onSubmit={submitSearch} className="flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 rounded-full border px-3 py-2 text-sm"
            />
            <button type="submit" className="rounded-full bg-brand px-4 text-white">
              Go
            </button>
          </form>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/shop?category=${c.slug}`} className="block py-1" onClick={() => setOpen(false)}>
              {c.name}
            </Link>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>
            My account
          </Link>
        </div>
      )}
    </header>
  );
}
