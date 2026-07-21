const Input = ({ label, error, type = "text", className = "", ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <input
        type={type}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition ${className}`}
        {...props}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
