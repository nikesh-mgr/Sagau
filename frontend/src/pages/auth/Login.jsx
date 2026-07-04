import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import useWorkerStore from "../../store/workerStore";

import { successToast, errorToast } from "../../utils/toast";

const Login = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const fetchWorkerProfile = useWorkerStore((state) => state.fetchProfile);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await login(formData);

      console.log("LOGIN RESPONSE:", response);

      const data = response?.data?.data;
      const user = data?.user;

      successToast(response?.data?.message);

      if (user?.role === "client") {
        navigate("/client");
        return;
      }

      if (user?.role === "worker") {
        try {
          // Check whether worker profile already exists
          await fetchWorkerProfile();

          // Profile exists
          navigate("/worker");
        } catch (error) {
          // Profile doesn't exist
          if (
            error?.response?.status === 404 ||
            error?.response?.status === 400
          ) {
            navigate("/worker/profile/create");
          } else {
            console.error(error);
            navigate("/worker");
          }
        }

        return;
      }

      navigate("/");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      errorToast(
        error?.response?.data?.message || error?.message || "Login Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-6"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-6">
          Don't have an account?
          <Link to="/register" className="text-blue-600 font-semibold ml-2">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
