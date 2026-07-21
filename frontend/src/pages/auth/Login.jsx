import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import useAuthStore from "../../store/authStore";

import { successToast, errorToast } from "../../utils/toast";

const Login = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const loading = useAuthStore((state) => state.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      const user = await login(data);

      console.log("LOGIN USER:", user);

      successToast("Login successful");

      if (user.role === "client") {
        navigate("/client/dashboard");
      } else if (user.role === "worker") {
        navigate("/worker/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      errorToast(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Card className="w-full max-w-md p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

        <p className="text-gray-500 mt-2">Login to your Sagau account</p>
      </div>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
          })}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
          })}
          error={errors.password?.message}
        />

        <Button loading={loading} type="submit">
          Login
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?
        <Link
          to="/auth/register"
          className="
          text-primary
          font-semibold
          ml-2
          hover:underline
          "
        >
          Register
        </Link>
      </p>
    </Card>
  );
};

export default Login;
