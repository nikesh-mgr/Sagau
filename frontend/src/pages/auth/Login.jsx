import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import useAuthStore from "../../store/authStore";

import { showSuccess, showError } from "../../utils/toast";
import { getErrorMessage } from "../../utils/getErrorMessage";

const Login = () => {
  const navigate = useNavigate();

  const { login, loading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      const role = response.data.user.role;

      showSuccess("Login successful");

      if (role === "client") {
        navigate("/client");
      } else if (role === "worker") {
        navigate("/worker");
      } else {
        navigate("/");
      }
    } catch (error) {
      showError(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <Card>
        <div className="w-full max-w-md p-8 md:p-10">
          <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
            Welcome Back
          </h1>

          <p className="mb-8 text-center text-slate-500">
            Login to your Sagau account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="Enter email"
              register={register("email", {
                required: "Email is required",
              })}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              register={register("password", {
                required: "Password is required",
              })}
              error={errors.password}
            />

            <Button type="submit" loading={loading}>
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
