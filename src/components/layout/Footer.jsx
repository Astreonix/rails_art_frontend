import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../services/productService.js';

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-xl text-brand">Rails Art</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            We offer a curated selection of fine arts, school, and office supplies. Quality materials for students,
            studios, and workplaces across Pakistan.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Contact Info</h4>
          <p className="mt-3 text-sm text-slate-600">Email: hello@railsart.pk</p>
          <p className="mt-1 text-sm text-slate-600">Phone: 0300 1234567</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/shop?category=${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Customer services</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link to="/account">My account</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/shop">All products</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} Rails Art</div>
    </footer>
  );
}
