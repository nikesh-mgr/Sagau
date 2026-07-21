import { Link } from "react-router-dom";

import { FiArrowLeft, FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-bold text-primary">404</h1>

        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-600 leading-relaxed">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-emerald-600 transition"
          >
            <FiHome />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            <FiArrowLeft />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-7xl">🔍</div>
      </div>
    </div>
  );
};

export default NotFound;
