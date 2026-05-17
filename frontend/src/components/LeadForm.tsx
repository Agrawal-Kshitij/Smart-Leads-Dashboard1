import { FormEvent, useState } from 'react';
import api from '../api/api';

interface LeadFormProps {
  onCreated: () => void;
}

const LeadForm = ({ onCreated }: LeadFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('New');
  const [source, setSource] = useState('Website');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/leads', { name, email, status, source });
      setName('');
      setEmail('');
      setStatus('New');
      setSource('Website');
      onCreated();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Unable to create lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <p className="text-lg font-semibold text-slate-900 dark:text-white">New lead</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Quickly add a new lead and assign their current status.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          className="rounded-3xl bg-slate-50 px-4 py-3 shadow-sm outline-none ring-0 transition dark:bg-slate-950 dark:text-slate-100"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="rounded-3xl bg-slate-50 px-4 py-3 shadow-sm outline-none ring-0 transition dark:bg-slate-950 dark:text-slate-100"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-3xl bg-slate-50 px-4 py-3 shadow-sm outline-none ring-0 transition dark:bg-slate-950 dark:text-slate-100"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
        </select>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="rounded-3xl bg-slate-50 px-4 py-3 shadow-sm outline-none ring-0 transition dark:bg-slate-950 dark:text-slate-100"
        >
          <option>Website</option>
          <option>Instagram</option>
          <option>Referral</option>
        </select>
      </div>
      {error && <p className="rounded-3xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-300">{error}</p>}
      <button type="submit" className="w-full rounded-3xl bg-brand px-4 py-3 text-white shadow-lg transition hover:bg-brandDark" disabled={loading}>
        {loading ? 'Saving…' : 'Create lead'}
      </button>
    </form>
  );
};

export default LeadForm;
