export default function VariantSelector({ variants = [], selectedId, onChange }) {
  if (!variants.length) return null;
  return (
    <div>
      <p className="mb-2 text-sm font-medium">Options</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const active = variant.id === selectedId;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onChange(variant)}
              className={`rounded-full border px-4 py-2 text-sm ${
                active ? 'border-brand bg-brand text-white' : 'border-slate-300 hover:border-brand'
              }`}
            >
              {variant.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
