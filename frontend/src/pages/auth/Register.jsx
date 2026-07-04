import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

import { successToast, errorToast } from "../../utils/toast";

const Register = () => {
  const navigate = useNavigate();

  const register = useAuthStore((state) => state.register);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "client",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(formData);

      successToast(response.data.message);

      navigate("/login");
    } catch (error) {
      console.log("REGISTER ERROR");

      console.log(error.response?.data);

      errorToast(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Registration Failed",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[450px]"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
        >
          <option value="client">Client</option>
          <option value="worker">Worker</option>
        </select>

        <button className="w-full bg-green-600 text-white py-3 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
