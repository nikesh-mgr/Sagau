import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import {
  FiDollarSign,
  FiClock,
  FiFileText,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";

import { applyToJob } from "../../api/applicationApi";

import { getSingleJob } from "../../api/jobApi";

import { successToast, errorToast } from "../../utils/toast";

const ApplyJob = () => {
  const { jobId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [job, setJob] = useState(null);

  const [proposalLength, setProposalLength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const response = await getSingleJob(jobId);

      setJob(response.data);
    } catch (error) {
      errorToast("Failed to load job details");
    }
  };

  const submit = async (data) => {
    try {
      setLoading(true);

      await applyToJob(jobId, {
        bidAmount: Number(data.bidAmount),

        estimatedDays: Number(data.estimatedDays),

        proposalText: data.proposalText,
      });

      successToast("Application submitted successfully");

      navigate("/worker/applications");
    } catch (error) {
      errorToast(
        error?.response?.data?.message || "Failed to submit application",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
max-w-5xl
mx-auto
space-y-8
"
    >
      {/* Back */}

      <button
        onClick={() => navigate(-1)}
        className="
flex
items-center
gap-2
text-emerald-600
font-semibold
hover:underline
"
      >
        <FiArrowLeft />
        Back
      </button>

      {/* Job Preview */}

      {job && (
        <div
          className="
bg-gradient-to-r
from-emerald-50
to-blue-50
rounded-3xl
p-6
border
"
        >
          <h2
            className="
text-2xl
font-bold
"
          >
            {job.title}
          </h2>

          <p
            className="
text-gray-600
mt-2
"
          >
            {job.category}
          </p>

          <div
            className="
flex
flex-wrap
gap-6
mt-5
text-sm
"
          >
            <span>💰 NPR {job.budget}</span>

            <span>📍 {job.location}</span>

            <span>Status: {job.status}</span>
          </div>
        </div>
      )}

      <div
        className="
bg-white
rounded-3xl
shadow-lg
border
p-8
"
      >
        <h1
          className="
text-3xl
font-bold
"
        >
          Submit Proposal
        </h1>

        <p
          className="
text-gray-500
mt-2
mb-8
"
        >
          Tell the client why you are the best person for this job.
        </p>

        <form
          onSubmit={handleSubmit(submit)}
          className="
space-y-7
"
        >
          {/* Bid */}

          <div>
            <label
              className="
font-semibold
block
mb-2
"
            >
              Your Bid Amount (NPR)
            </label>

            <div className="relative">
              <FiDollarSign
                className="
absolute
left-4
top-4
text-gray-400
"
              />

              <input
                type="number"
                placeholder="5000"
                className="
w-full
border
rounded-xl
pl-12
py-3
outline-none
focus:ring-2
focus:ring-emerald-500
"
                {...register("bidAmount", {
                  required: "Bid amount required",

                  min: {
                    value: 1,
                    message: "Invalid amount",
                  },
                })}
              />
            </div>

            {errors.bidAmount && (
              <p
                className="
text-red-500
text-sm
mt-2
"
              >
                {errors.bidAmount.message}
              </p>
            )}
          </div>

          {/* Days */}

          <div>
            <label
              className="
font-semibold
block
mb-2
"
            >
              Estimated Completion Days
            </label>

            <div className="relative">
              <FiClock
                className="
absolute
left-4
top-4
text-gray-400
"
              />

              <input
                type="number"
                placeholder="7"
                className="
w-full
border
rounded-xl
pl-12
py-3
outline-none
focus:ring-2
focus:ring-emerald-500
"
                {...register("estimatedDays", {
                  required: "Estimated days required",

                  min: {
                    value: 1,
                    message: "Minimum 1 day",
                  },
                })}
              />
            </div>

            {errors.estimatedDays && (
              <p
                className="
text-red-500
text-sm
mt-2
"
              >
                {errors.estimatedDays.message}
              </p>
            )}
          </div>

          {/* Proposal */}

          <div>
            <label
              className="
font-semibold
block
mb-2
"
            >
              Proposal Message
            </label>

            <div className="relative">
              <FiFileText
                className="
absolute
left-4
top-4
text-gray-400
"
              />

              <textarea
                rows="7"
                placeholder="
Explain your skills, experience and how you will complete this project.
"
                className="
w-full
border
rounded-xl
pl-12
p-4
outline-none
resize-none
focus:ring-2
focus:ring-emerald-500
"
                {...register("proposalText", {
                  required: "Proposal required",

                  minLength: {
                    value: 20,
                    message: "Minimum 20 characters required",
                  },
                })}
                onChange={(e) => setProposalLength(e.target.value.length)}
              />
            </div>

            <div
              className="
flex
justify-between
mt-2
"
            >
              {errors.proposalText ? (
                <p
                  className="
text-red-500
text-sm
"
                >
                  {errors.proposalText.message}
                </p>
              ) : (
                <p
                  className="
text-gray-400
text-sm
"
                >
                  Minimum 20 characters
                </p>
              )}

              <p
                className="
text-gray-400
text-sm
"
              >
                {proposalLength}/500
              </p>
            </div>
          </div>

          {/* Tips */}

          <div
            className="
bg-emerald-50
rounded-2xl
p-6
"
          >
            <h3
              className="
font-bold
mb-4
"
            >
              Before submitting
            </h3>

            <div
              className="
space-y-3
text-gray-600
"
            >
              <p className="flex gap-2">
                <FiCheckCircle className="text-emerald-600" />
                Give realistic pricing
              </p>

              <p className="flex gap-2">
                <FiCheckCircle className="text-emerald-600" />
                Explain your experience
              </p>

              <p className="flex gap-2">
                <FiCheckCircle className="text-emerald-600" />
                Mention your work approach
              </p>
            </div>
          </div>

          {/* Buttons */}

          <div
            className="
flex
justify-end
gap-4
"
          >
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
px-6
py-3
rounded-xl
border
hover:bg-gray-100
"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="
px-8
py-3
rounded-xl
bg-emerald-600
text-white
font-semibold
hover:bg-emerald-700
disabled:opacity-50
"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
