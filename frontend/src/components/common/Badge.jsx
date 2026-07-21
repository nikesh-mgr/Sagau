const Badge = ({ children, variant = "success" }) => {
  const styles = {
    success: "bg-emerald-100 text-emerald-700",

    warning: "bg-yellow-100 text-yellow-700",

    danger: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
