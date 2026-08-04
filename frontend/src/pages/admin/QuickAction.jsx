import { Link } from "react-router-dom";

const QuickAction = ({ title, description, icon: Icon, link }) => {
  return (
    <Link to={link} className="group">
      <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          {typeof Icon === "function" ? <Icon size={24} /> : Icon}
        </div>

        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
};

export default QuickAction;
