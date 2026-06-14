const Input = ({ label, type = "text", placeholder, register, error }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default Input;
