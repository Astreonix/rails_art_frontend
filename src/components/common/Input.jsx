export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block text-sm">
      {label && <span className="mb-1.5 block font-medium text-slate-700">{label}</span>}
      <input
        className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm ${className}`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
