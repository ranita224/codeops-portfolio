export default function Field({ id, label, error, showError, as = "input", children, ...inputProps }) {
  const Tag = as;

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Tag
        id={id}
        aria-invalid={showError}
        aria-describedby={showError ? `${id}-error` : undefined}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors ${
          showError
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-amber-500"
        }`}
        {...inputProps}
      >
        {children}
      </Tag>
      {showError && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}