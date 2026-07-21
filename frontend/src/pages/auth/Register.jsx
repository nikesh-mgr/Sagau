import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import useAuthStore from "../../store/authStore";

import { successToast, errorToast } from "../../utils/toast";

const Register = () => {
  const navigate = useNavigate();

  const registerUser = useAuthStore((state) => state.register);

  const loading = useAuthStore((state) => state.loading);

  const [role, setRole] = useState("worker");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      const user = await registerUser({
        ...data,

        role,
      });

      console.log("REGISTER USER:", user);

      successToast("Account created successfully");

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
      console.log("REGISTER ERROR:", error);

      errorToast(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Card className="w-full max-w-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>

        <p className="text-gray-500 mt-2">Join Sagau marketplace</p>
      </div>

      {/* Role Selection */}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          type="button"
          onClick={() => setRole("client")}
          className={`
          py-3
          rounded-xl
          border
          font-semibold
          transition

          ${
            role === "client"
              ? "border-primary bg-emerald-50 text-primary"
              : "border-gray-200"
          }

          `}
        >
          Client
        </button>

        <button
          type="button"
          onClick={() => setRole("worker")}
          className={`
          py-3
          rounded-xl
          border
          font-semibold
          transition

          ${
            role === "worker"
              ? "border-primary bg-emerald-50 text-primary"
              : "border-gray-200"
          }

          `}
        >
          Worker
        </button>
      </div>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          {...register("fullName", {
            required: "Full name is required",
          })}
          error={errors.fullName?.message}
        />

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
          placeholder="Create password"
          {...register("password", {
            required: "Password is required",

            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password?.message}
        />

        <Button loading={loading} type="submit">
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?
        <Link
          to="/auth/login"
          className="
          text-primary
          font-semibold
          ml-2
          hover:underline
          "
        >
          Login
        </Link>
      </p>
    </Card>
  );
};

export default Register;
