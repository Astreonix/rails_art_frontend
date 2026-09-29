import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import useAuth from '../hooks/useAuth.js';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from || '/account';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const user = await login(form);
      navigate(user.role === 'admin' ? '/admin' : from);
    } catch (err) {
      setError(err.message || 'Login failed.');
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-4 px-4 py-16">
      <h1 className="font-display text-3xl">Login</h1>
      <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" className="w-full">
        Sign in
      </Button>
      <p className="text-sm text-slate-500">
        New customer? <Link to="/register" className="text-brand">Create an account</Link>
      </p>
      <p className="text-xs text-slate-400">Admin demo: admin@railsart.pk / Admin@123</p>
    </form>
  );
}
