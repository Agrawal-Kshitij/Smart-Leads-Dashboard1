import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-sky-600 via-indigo-600 to-cyan-500 px-8 py-10 text-white shadow-soft shadow-slate-400/10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-200/80">Smart Leads</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">Welcome back, {user?.name}</h1>
            <p className="mt-3 max-w-2xl text-base text-slate-100/90">
              Your lead pipeline is ready. Use the dashboard to find key opportunities, filter performance, and export team insights.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/leads"
              className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Manage leads
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Sign out
            </button>
          </div>
        </div>
      </section>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <article className="rounded-[1.75rem] bg-white p-6 shadow-soft dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Role</p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{user?.role === 'admin' ? 'Administrator' : 'Sales user'}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            {user?.role === 'admin'
              ? 'You can manage all leads and access full reports.'
              : 'You can manage your leads, update statuses, and export data.'}
          </p>
        </article>

        <article className="rounded-[1.75rem] bg-white p-6 shadow-soft dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Focus</p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">Filter & Search</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Combine status, source, and text search to narrow down leads instantly.</p>
        </article>

        <article className="rounded-[1.75rem] bg-white p-6 shadow-soft dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Export</p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">CSV Ready</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">Export lead data with one click and bring it into reports or spreadsheets.</p>
        </article>
      </div>
    </div>
  );
};

export default Dashboard;
