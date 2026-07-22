import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { FiArrowLeft, FiEdit3, FiBriefcase, FiInfo } from "react-icons/fi";

import { motion } from "framer-motion";

import JobForm from "../../components/job/JobForm";

import { getSingleJob, updateJob } from "../../api/jobApi";

import { successToast, errorToast } from "../../utils/toast";

const EditJob = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      setPageLoading(true);

      const response = await getSingleJob(id);

      setJob(response.data);
    } catch (error) {
      console.log(error);

      errorToast("Unable to load job.");
    } finally {
      setPageLoading(false);
    }
  };

  const handleUpdateJob = async (jobData) => {
    try {
      setLoading(true);

      await updateJob(id, jobData);

      successToast("Job updated successfully.");

      navigate("/client/jobs");
    } catch (error) {
      console.log(error);

      errorToast(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Failed to update job.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div
        className="
          min-h-[400px]
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <div
            className="
              h-12
              w-12
              rounded-full
              border-4
              border-emerald-600
              border-t-transparent
              animate-spin
              mx-auto
            "
          />

          <p
            className="
              mt-4
              text-slate-500
            "
          >
            Loading job information...
          </p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          p-8
          text-center
        "
      >
        <FiBriefcase
          className="
            text-5xl
            text-slate-300
            mx-auto
          "
        />

        <h2
          className="
            mt-5
            text-2xl
            font-bold
            text-slate-900
          "
        >
          Job not found
        </h2>

        <Link
          to="/client/jobs"
          className="
            inline-flex
            mt-6
            bg-emerald-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            hover:bg-emerald-700
            transition
          "
        >
          Back to My Jobs
        </Link>
      </div>
    );
  }

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
        {/* BACK NAVIGATION */}

        <Link
          to="/client/jobs"
          className="
            inline-flex
            items-center
            gap-2
            text-emerald-600
            font-semibold
            hover:text-emerald-700
            transition
          "
        >
          <FiArrowLeft />
          Back to My Jobs
        </Link>

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-white
            rounded-3xl
            border
            border-slate-200
            shadow-sm
            p-6
            sm:p-8
            flex
            flex-col
            sm:flex-row
            gap-5
            sm:items-center
          "
        >
          <div
            className="
              h-14
              w-14
              rounded-2xl
              bg-emerald-100
              text-emerald-600
              flex
              items-center
              justify-center
            "
          >
            <FiEdit3
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
              Edit Job
            </h1>

            <p
              className="
                mt-2
                text-slate-600
              "
            >
              Update your project details and attract the right skilled workers.
            </p>
          </div>
        </motion.div>

        {/* INFORMATION NOTICE */}

        <div
          className="
            bg-blue-50
            border
            border-blue-100
            rounded-2xl
            p-5
            flex
            gap-4
            items-start
          "
        >
          <FiInfo
            className="
              text-blue-600
              text-xl
              mt-1
              shrink-0
            "
          />

          <p
            className="
              text-sm
              text-slate-700
              leading-relaxed
            "
          >
            Keep your job information accurate. Clear descriptions, realistic
            budgets, and required skills help workers understand your project
            better.
          </p>
        </div>

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
            border
            border-slate-200
            shadow-sm
            p-6
            sm:p-8
          "
        >
          <JobForm
            defaultValues={job}
            onSubmit={handleUpdateJob}
            loading={loading}
            buttonText="Update Job"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default EditJob;
