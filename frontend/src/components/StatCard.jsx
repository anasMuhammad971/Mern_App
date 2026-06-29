function StatCard({ label, value, accent = "blue", symbol }) {
  const accentClasses = {
    blue: "bg-blue-50 text-campus",
    green: "bg-emerald-50 text-mint",
    amber: "bg-amber-50 text-amber-700",
    coral: "bg-orange-50 text-coral",
    rose: "bg-rose-50 text-rose-700"
  };

  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink">{value}</p>
        </div>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-lg text-xl ${
            accentClasses[accent] || accentClasses.blue
          }`}
          aria-hidden="true"
        >
          {symbol}
        </span>
      </div>
    </article>
  );
}

export default StatCard;
