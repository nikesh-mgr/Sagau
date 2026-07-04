import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Sagau</h1>

        <p className="text-gray-600 mb-8">
          Connect Clients and Skilled Workers
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
