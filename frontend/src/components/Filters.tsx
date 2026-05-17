interface FiltersProps {
  status: string;
  source: string;
  search: string;
  sort: string;
  onChange: (field: string, value: string) => void;
  onExport: () => void;
}

const Filters = ({ status, source, search, sort, onChange, onExport }: FiltersProps) => (
  <div className="grid gap-4 rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/95 sm:grid-cols-2 lg:grid-cols-3">
    <input
      placeholder="Search name or email"
      value={search}
      onChange={(e) => onChange('search', e.target.value)}
      className="w-full rounded-3xl bg-slate-50 px-4 py-3 shadow-sm outline-none ring-0 transition dark:bg-slate-950"
    />
    <select
      value={status}
      onChange={(e) => onChange('status', e.target.value)}
      className="w-full rounded-3xl bg-slate-50 px-4 py-3 shadow-sm outline-none ring-0 transition dark:bg-slate-950"
    >
      <option value="">All statuses</option>
      <option value="New">New</option>
      <option value="Contacted">Contacted</option>
      <option value="Qualified">Qualified</option>
      <option value="Lost">Lost</option>
    </select>
    <select
      value={source}
      onChange={(e) => onChange('source', e.target.value)}
      className="w-full rounded-3xl bg-slate-50 px-4 py-3 shadow-sm outline-none ring-0 transition dark:bg-slate-950"
    >
      <option value="">All sources</option>
      <option value="Website">Website</option>
      <option value="Instagram">Instagram</option>
      <option value="Referral">Referral</option>
    </select>
    <select
      value={sort}
      onChange={(e) => onChange('sort', e.target.value)}
      className="w-full rounded-3xl bg-slate-50 px-4 py-3 shadow-sm outline-none ring-0 transition dark:bg-slate-950"
    >
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
    </select>
    <button
      type="button"
      onClick={onExport}
      className="rounded-3xl bg-brand px-4 py-3 text-white transition hover:bg-brandDark"
    >
      Export CSV
    </button>
  </div>
);

export default Filters;
