const EmptyState = ({ message }: { message: string }) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
    <p>{message}</p>
  </div>
);

export default EmptyState;
