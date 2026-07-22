const Card = ({
  children,
  className = "",
  padding = true,
  hover = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white
        rounded-2xl
        shadow-card
        border
        border-gray-100
        ${padding ? "p-6" : ""}
        ${
          hover
            ? "hover:shadow-xl hover:-translate-y-1 transition duration-300"
            : ""
        }
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
