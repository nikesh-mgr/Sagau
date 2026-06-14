const Card = ({ children }) => {
  return (
    <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-slate-100">
      {children}
    </div>
  );
};

export default Card;
