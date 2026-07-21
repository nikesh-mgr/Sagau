const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-card border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
