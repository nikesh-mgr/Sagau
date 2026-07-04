import { FaBriefcase, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const WorkerStats = () => {
  const stats = [
    {
      title: "Jobs Available",
      value: "--",
      icon: <FaBriefcase size={30} />,
    },
    {
      title: "Applications",
      value: "--",
      icon: <FaClipboardList size={30} />,
    },
    {
      title: "Completed",
      value: "--",
      icon: <FaCheckCircle size={30} />,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((item) => (
        <div key={item.title} className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">{item.title}</p>

              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
            </div>

            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkerStats;
