const Badge = ({ children, variant = "success" }) => {
  const styles = {
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    neutral: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[variant] || styles.neutral
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;
