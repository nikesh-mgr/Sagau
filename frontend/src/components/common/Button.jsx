const Button = ({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) => {
  const styles = {
    primary: "bg-primary text-white hover:bg-emerald-600",

    secondary: "bg-dark text-white hover:opacity-90",

    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",

    danger: "bg-red-500 text-white hover:bg-red-600",

    success: "bg-green-600 text-white hover:bg-green-700",

    ghost: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };

  return (
    <button
      type={type}
      disabled={loading}
      aria-busy={loading}
      className={`
        px-6
        py-3
        rounded-xl
        font-semibold
        transition
        duration-300
        flex
        items-center
        justify-center
        gap-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${styles[variant] || styles.primary}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
