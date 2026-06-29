function EmptyState({ title, message }) {
  return (
    <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center shadow-soft">
      <p className="text-lg font-bold text-ink">{title}</p>
      <p className="mt-2 text-sm text-slate-500">{message}</p>
    </div>
  );
}

export default EmptyState;
