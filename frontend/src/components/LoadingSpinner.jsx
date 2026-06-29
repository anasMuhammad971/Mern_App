function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="rounded-lg border border-line bg-white p-8 text-center shadow-soft">
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-campus" />
      <p className="mt-3 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}

export default LoadingSpinner;
