const Input = ({
  label,
  error,
  type = "text",
  className = "",
  id,
  icon,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={id}
          type={type}
          className={`
            w-full
            px-4
            py-3
            rounded-xl
            border
            outline-none
            transition
            ${
              error
                ? "border-red-400 focus:ring-red-400"
                : "border-gray-200 focus:ring-primary focus:border-primary"
            }
            ${icon ? "pl-11" : ""}
            disabled:bg-gray-100
            disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
