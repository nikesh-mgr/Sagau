import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { registerSchema } from "../../features/auth/schemas/authSchemas";
import { registerUser } from "../../features/auth/services/authService";

import useAuthStore from "../../store/authStore";

const Register = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "client",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      const authData = response.data;

      setAuth({
        token: authData.token,
        user: authData.user,
      });

      toast.success(response.message);
      if (authData.user.role === "client") {
        navigate("/client/create-profile");
      } else if (authData.user.role === "worker") {
        navigate("/worker/create-profile");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));

        return;
      }

      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">Register</h1>

        <input
          placeholder="Full Name"
          {...register("fullName")}
          className="w-full border p-3 rounded mb-2"
        />

        <p className="text-red-500 text-sm mb-3">{errors.fullName?.message}</p>

        <input
          placeholder="Email"
          {...register("email")}
          className="w-full border p-3 rounded mb-2"
        />

        <p className="text-red-500 text-sm mb-3">{errors.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border p-3 rounded mb-2"
        />

        <p className="text-red-500 text-sm mb-3">{errors.password?.message}</p>

        <select
          {...register("role")}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="client">Client</option>
          <option value="worker">Worker</option>
        </select>

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {isSubmitting ? "Creating..." : "Register"}
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
