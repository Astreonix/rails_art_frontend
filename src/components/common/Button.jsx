export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const styles = {
    primary: 'bg-brand text-white hover:bg-brand-dark',
    dark: 'bg-ink text-white hover:bg-black',
    outline: 'border border-brand text-brand hover:bg-brand hover:text-white',
    ghost: 'text-ink hover:text-brand',
  };
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
