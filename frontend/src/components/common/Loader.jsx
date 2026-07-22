const Loader = ({ size = "md", text = "", fullScreen = false }) => {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-14 w-14 border-4",
  };

  return (
    <div
      className={`
        flex
        flex-col
        justify-center
        items-center
        gap-4
        ${fullScreen ? "min-h-screen" : "py-10"}
      `}
    >
      <div
        className={`
          rounded-full
          border-primary
          border-t-transparent
          animate-spin
          ${sizes[size]}
        `}
      />

      {text && <p className="text-gray-500 font-medium">{text}</p>}
    </div>
  );
};

export default Loader;
