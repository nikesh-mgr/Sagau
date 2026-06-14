const Button = ({ children, type = "button", loading }) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
