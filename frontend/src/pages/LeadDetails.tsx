import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/leads/${id}`);
        setLead(response.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Unable to load lead');
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  return (
    <Layout title="Lead details">
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="rounded-3xl bg-rose-50 p-6 text-rose-700 dark:bg-rose-950 dark:text-rose-300">{error}</div>
      ) : (
        <div className="space-y-6 rounded-[2rem] bg-white p-8 shadow-soft dark:bg-slate-900">
          <div className="rounded-[1.75rem] bg-gradient-to-r from-sky-600 via-indigo-600 to-cyan-500 p-8 text-white shadow-lg">
            <h1 className="text-3xl font-semibold">{lead.name}</h1>
            <p className="mt-2 text-slate-100/80">Lead details and status overview.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 rounded-[1.75rem] bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
              <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{lead.email}</p>
            </div>
            <div className="space-y-2 rounded-[1.75rem] bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Source</p>
              <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{lead.source}</p>
            </div>
            <div className="space-y-2 rounded-[1.75rem] bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
              <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{lead.status}</p>
            </div>
            <div className="space-y-2 rounded-[1.75rem] bg-slate-50 p-5 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Created At</p>
              <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{new Date(lead.createdAt).toLocaleString()}</p>
            </div>
          </div>
          <button
            className="rounded-3xl bg-brand px-5 py-3 text-white shadow-lg transition hover:bg-brandDark"
            onClick={() => navigate('/leads')}
          >
            Back to leads
          </button>
        </div>
      )}
    </Layout>
  );
};

export default LeadDetails;
