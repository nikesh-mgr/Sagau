import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import useAuthStore from "../../store/authStore";
import { showSuccess, showError } from "../../utils/toast";

const Register = () => {
  const navigate = useNavigate();

  const { register: registerUser, loading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      showSuccess("Account created successfully");

      navigate("/");
    } catch (error) {
      console.error(error);

      showError(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <Card>
        <div className="w-full max-w-md p-8 md:p-10">
          <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="mb-8 text-center text-slate-500">
            Join Sagau and start your journey
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              register={register("fullName", {
                required: "Full name is required",
              })}
              error={errors.fullName}
            />

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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={errors.password}
            />

            <div>
              <label className="mb-1 block text-sm font-medium">Role</label>

              <select
                {...register("role", {
                  required: "Role is required",
                })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="client">Client</option>
                <option value="worker">Worker</option>
              </select>

              {errors.role && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>

            <Button type="submit" loading={loading}>
              Register
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
