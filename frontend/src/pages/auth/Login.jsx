import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

import { loginSchema } from "../../features/auth/schemas/authSchemas";
import { loginUser } from "../../features/auth/services/authService";

import useAuthStore from "../../store/authStore";

const Login = () => {
  const navigate = useNavigate();

  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      const authData = response.data;

      setAuth({
        token: authData.token,
        user: authData.user,
      });

      toast.success(response.message);
      switch (authData.user.role) {
        case "client":
          navigate("/client/create-profile");
          break;

        case "worker":
          navigate("/worker/create-profile");
          break;

        case "admin":
          navigate("/admin/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => toast.error(err.msg));

        return;
      }

      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <input
          type="email"
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

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
