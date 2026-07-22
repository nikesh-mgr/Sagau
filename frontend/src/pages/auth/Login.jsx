import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiShield, FiUsers } from "react-icons/fi";

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
      errorToast(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Background Blur */}
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl"></div>

      {/* Home Button */}
      <div className="fixed left-5 top-5 z-30">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg"
        >
          <FiArrowLeft className="text-base" />
          Home
        </Link>
      </div>

      {/* Left Side */}
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center px-16">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Welcome to Sagau
          </div>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900">
            Hire trusted freelancers
            <br />
            <span className="text-blue-600">& local skilled workers.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Discover verified professionals, manage projects effortlessly, and
            build long-term working relationships through Nepal's modern
            freelance and skilled worker marketplace.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                <FiUsers className="text-xl text-blue-600" />
              </div>

              <h3 className="text-3xl font-bold text-slate-900">1000+</h3>

              <p className="mt-2 text-sm text-slate-500">Skilled Workers</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                <FiShield className="text-xl text-green-600" />
              </div>

              <h3 className="text-3xl font-bold text-slate-900">Secure</h3>

              <p className="mt-2 text-sm text-slate-500">Trusted Marketplace</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative flex w-full items-center justify-center px-5 py-12 sm:px-8 lg:w-1/2">
        <Card className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-2xl font-bold text-white shadow-lg">
              S
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Login to continue your journey with Sagau.
            </p>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5">
            <Input
              label="Email Address"
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

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              loading={loading}
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-base font-semibold transition-all duration-300"
            >
              Login
              {!loading && (
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </Button>
          </form>

          <div className="mt-8 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-slate-600">Don't have an account?</p>

            <Link
              to="/auth/register"
              className="mt-2 inline-flex items-center font-semibold text-blue-600 transition-all duration-300 hover:text-blue-700 hover:underline"
            >
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
