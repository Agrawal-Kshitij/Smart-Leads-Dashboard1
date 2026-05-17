import { Link } from 'react-router-dom';

export interface LeadRow {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
}

const LeadTable = ({ leads }: { leads: LeadRow[] }) => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-6 py-4 font-medium text-slate-600">Name</th>
          <th className="px-6 py-4 font-medium text-slate-600">Email</th>
          <th className="px-6 py-4 font-medium text-slate-600">Status</th>
          <th className="px-6 py-4 font-medium text-slate-600">Source</th>
          <th className="px-6 py-4 font-medium text-slate-600">Created</th>
          <th className="px-6 py-4 font-medium text-slate-600">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 bg-white">
        {leads.map((lead) => (
          <tr key={lead._id}>
            <td className="px-6 py-4 text-slate-800">{lead.name}</td>
            <td className="px-6 py-4 text-slate-600">{lead.email}</td>
            <td className="px-6 py-4 text-slate-600">{lead.status}</td>
            <td className="px-6 py-4 text-slate-600">{lead.source}</td>
            <td className="px-6 py-4 text-slate-600">{new Date(lead.createdAt).toLocaleDateString()}</td>
            <td className="px-6 py-4">
              <Link
                to={`/leads/${lead._id}`}
                className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LeadTable;
