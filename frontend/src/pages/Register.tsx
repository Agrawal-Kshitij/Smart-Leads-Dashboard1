import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'sales'>('sales');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_20%)]" />
      <div className="relative w-full max-w-lg rounded-[2rem] bg-white/95 p-8 shadow-soft backdrop-blur dark:bg-slate-900/95">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-brandDark">Join the team</p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Create your account</h1>
          <p className="text-slate-600 dark:text-slate-400">Get started with role-based access, lead management, and fast export tools.</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-slate-700 dark:text-slate-300">
            <span className="text-sm font-medium">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-3xl bg-slate-50 px-4 py-3 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100"
              placeholder="Your full name"
              required
            />
          </label>
          <label className="block text-slate-700 dark:text-slate-300">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-3xl bg-slate-50 px-4 py-3 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="block text-slate-700 dark:text-slate-300">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-3xl bg-slate-50 px-4 py-3 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </label>
          <label className="block text-slate-700 dark:text-slate-300">
            <span className="text-sm font-medium">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'sales')}
              className="mt-2 w-full rounded-3xl bg-slate-50 px-4 py-3 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="sales">Sales User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          {error && <p className="rounded-3xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-300">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-3xl bg-brand px-4 py-3 text-white shadow-lg transition hover:bg-brandDark"
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-brand hover:text-brandDark">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
