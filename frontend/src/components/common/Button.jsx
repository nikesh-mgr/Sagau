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
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`px-6 py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
