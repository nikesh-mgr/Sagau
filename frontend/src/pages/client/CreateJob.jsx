import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { FiBriefcase, FiArrowLeft } from "react-icons/fi";

import { motion } from "framer-motion";

import JobForm from "../../components/job/JobForm";

import { createJob } from "../../api/jobApi";

import { successToast, errorToast } from "../../utils/toast";

const CreateJob = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreateJob = async (jobData) => {
    try {
      setLoading(true);

      await createJob(jobData);

      successToast("Job posted successfully.");

      navigate("/client/jobs");
    } catch (error) {
      console.error("CREATE JOB ERROR:", error.response || error);

      errorToast(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Failed to create job.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-50
      via-white
      to-blue-50
      px-4
      py-8
      sm:px-6
      lg:px-10
      "
    >
      <div
        className="
        max-w-5xl
        mx-auto
        space-y-8
        "
      >
        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          sm:p-8
          "
        >
          <Link
            to="/client/jobs"
            className="
            inline-flex
            items-center
            gap-2
            text-blue-600
            font-semibold
            hover:text-blue-700
            transition
            "
          >
            <FiArrowLeft />
            Back to Jobs
          </Link>

          <div
            className="
            mt-6
            flex
            items-center
            gap-4
            "
          >
            <div
              className="
              h-14
              w-14
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              "
            >
              <FiBriefcase
                className="
                text-2xl
                "
              />
            </div>

            <div>
              <h1
                className="
                text-3xl
                sm:text-4xl
                font-bold
                text-slate-900
                "
              >
                Post a New Job
              </h1>

              <p
                className="
                mt-2
                text-slate-500
                "
              >
                Describe your project clearly so skilled workers can apply.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FORM */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-slate-200
          p-6
          sm:p-8
          "
        >
          <JobForm
            onSubmit={handleCreateJob}
            loading={loading}
            buttonText="Post Job"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default CreateJob;
