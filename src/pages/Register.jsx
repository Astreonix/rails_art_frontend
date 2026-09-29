import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import useAuth from '../hooks/useAuth.js';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-md space-y-4 px-4 py-16">
      <h1 className="font-display text-3xl">Create account</h1>
      <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" className="w-full">
        Register
      </Button>
      <p className="text-sm text-slate-500">
        Already have an account? <Link to="/login" className="text-brand">Login</Link>
      </p>
    </form>
  );
}
