import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { FiDollarSign, FiClock, FiFileText } from "react-icons/fi";

import { applyToJob } from "../../api/applicationApi";

import { successToast, errorToast } from "../../utils/toast";

const ApplyJob = () => {
  const { jobId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      setLoading(true);

      await applyToJob(jobId, {
        bidAmount: Number(data.bidAmount),
        estimatedDays: Number(data.estimatedDays),
        proposalText: data.proposalText,
      });

      successToast("Application submitted successfully.");

      navigate("/worker/applications");
    } catch (error) {
      console.log(error);

      errorToast(
        error?.response?.data?.message || "Failed to submit application.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-card p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Apply for Job</h1>

          <p className="text-gray-500 mt-2">
            Submit a competitive proposal to the client.
          </p>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-7">
          <div>
            <label className="font-semibold mb-2 block">Bid Amount (NPR)</label>

            <div className="relative">
              <FiDollarSign className="absolute left-4 top-4 text-gray-400" />

              <input
                type="number"
                placeholder="5000"
                className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                {...register("bidAmount", {
                  required: "Bid amount is required",
                  min: {
                    value: 1,
                    message: "Invalid amount",
                  },
                })}
              />
            </div>

            {errors.bidAmount && (
              <p className="text-red-500 text-sm mt-2">
                {errors.bidAmount.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-semibold mb-2 block">Estimated Days</label>

            <div className="relative">
              <FiClock className="absolute left-4 top-4 text-gray-400" />

              <input
                type="number"
                placeholder="10"
                className="w-full border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                {...register("estimatedDays", {
                  required: "Estimated days are required",
                  min: {
                    value: 1,
                    message: "Minimum 1 day",
                  },
                })}
              />
            </div>

            {errors.estimatedDays && (
              <p className="text-red-500 text-sm mt-2">
                {errors.estimatedDays.message}
              </p>
            )}
          </div>{" "}
          <div>
            <label className="font-semibold mb-2 block">Proposal</label>

            <div className="relative">
              <FiFileText className="absolute left-4 top-4 text-gray-400" />

              <textarea
                rows={8}
                placeholder="Introduce yourself, explain your experience, how you will complete the work, and why the client should hire you..."
                className="w-full border rounded-xl pl-11 pr-4 py-3 resize-none focus:ring-2 focus:ring-primary outline-none"
                {...register("proposalText", {
                  required: "Proposal is required",
                  minLength: {
                    value: 20,
                    message: "Proposal must contain at least 20 characters",
                  },
                })}
              />
            </div>

            {errors.proposalText && (
              <p className="text-red-500 text-sm mt-2">
                {errors.proposalText.message}
              </p>
            )}
          </div>
          <div className="bg-gray-50 border rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Before submitting</h3>

            <ul className="list-disc ml-5 text-gray-600 space-y-2">
              <li>Make sure your bid amount is realistic.</li>

              <li>Explain your experience clearly.</li>

              <li>Give a realistic completion time.</li>

              <li>Your proposal should be professional and detailed.</li>
            </ul>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-emerald-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>{" "}
    </div>
  );
};

export default ApplyJob;
