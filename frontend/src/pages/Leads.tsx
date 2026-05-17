import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Filters from '../components/Filters';
import Layout from '../components/Layout';
import LeadForm from '../components/LeadForm';
import LeadTable from '../components/LeadTable';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import { useDebounce } from '../hooks/useDebounce';

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

const Leads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const debouncedSearch = useDebounce(search, 500);
  const [error, setError] = useState('');

  const params = useMemo(() => ({ page, status, source, search: debouncedSearch, sort }), [page, status, source, debouncedSearch, sort]);

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/leads', { params });
      setLeads(response.data.leads);
      setPages(response.data.pagination.pages);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [params]);

  const handleExport = async () => {
    try {
      const response = await api.get('/leads/export', { params, responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'leads.csv';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } catch {
      setError('Export failed');
    }
  };

  return (
    <Layout title="Leads">
      <div className="space-y-6">
        <section className="rounded-[2rem] bg-gradient-to-r from-sky-600 via-indigo-600 to-cyan-500 p-8 text-white shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-200/90">Lead workspace</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">View and manage your pipeline</h1>
              <p className="mt-2 max-w-2xl text-slate-100/80">Use modern filters, search, and CSV export to stay on top of the most important leads.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleExport}
                className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Export CSV
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Back to dashboard
              </button>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Filters status={status} source={source} search={search} sort={sort} onChange={(field, value) => {
              if (field === 'status') setStatus(value);
              if (field === 'source') setSource(value);
              if (field === 'search') setSearch(value);
              if (field === 'sort') setSort(value);
              setPage(1);
            }} onExport={handleExport} />

            {error && <div className="rounded-3xl bg-rose-50 p-4 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-300">{error}</div>}

            {loading ? <Loading /> : leads.length === 0 ? <EmptyState message="No leads found. Update filters or create a new lead." /> : <LeadTable leads={leads} />}

            <Pagination page={page} pages={pages} onPageChange={(newPage) => setPage(newPage)} />
          </div>
          <div className="space-y-6">
            <LeadForm onCreated={() => { setPage(1); fetchLeads(); }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leads;
