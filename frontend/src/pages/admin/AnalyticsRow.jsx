const AnalyticsRow = ({ title, value, icon: Icon }) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm border">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
      </div>

      {Icon && (
        <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default AnalyticsRow;