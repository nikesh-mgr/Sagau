import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiTag,
  FiEdit,
  FiArrowLeft,
  FiTrash2,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";

import { getSingleJob, deleteJob } from "../../api/jobApi";

import { errorToast, successToast } from "../../utils/toast";

const JobDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const response = await getSingleJob(id);

      setJob(response.data);
    } catch (error) {
      console.log(error);

      errorToast("Unable to load job");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (job.status !== "OPEN") {
      errorToast("Only open jobs can be deleted");

      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(job._id);

      successToast("Job deleted successfully");

      navigate("/client/jobs");
    } catch (error) {
      console.log(error);

      errorToast(error?.response?.data?.message || "Failed to delete job");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "COMPLETED":
        return "bg-purple-100 text-purple-700 border-purple-200";

      default:
        return "bg-red-100 text-red-700 border-red-200";
    }
  };

  if (loading) {
    return (
      <div
        className="
          min-h-[400px]
          bg-white
          rounded-3xl
          shadow-sm
          border
          border-slate-200
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <div
            className="
              w-12
              h-12
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
            Loading job details...
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
          shadow-sm
          border
          border-slate-200
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
            mt-4
            text-2xl
            font-bold
            text-slate-800
          "
        >
          Job not found
        </h2>

        <Link
          to="/client/jobs"
          className="
            inline-flex
            mt-5
            bg-emerald-600
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
          "
        >
          Back To Jobs
        </Link>
      </div>
    );
  }

  const isOpen = job.status === "OPEN";

  return (
    <div
      className="
        space-y-8
        pb-10
      "
    >
      {/* TOP ACTION BAR */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
        "
      >
        <Link
          to="/client/jobs"
          className="
            inline-flex
            items-center
            gap-2
            text-emerald-600
            font-semibold
            hover:text-emerald-700
          "
        >
          <FiArrowLeft />
          Back To Jobs
        </Link>

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-3
          "
        >
          {isOpen && (
            <Link
              to={`/client/jobs/edit/${job._id}`}
              className="
                inline-flex
                justify-center
                items-center
                gap-2
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-xl
                font-semibold
                hover:bg-blue-700
                transition
              "
            >
              <FiEdit />
              Edit Job
            </Link>
          )}

          {isOpen && (
            <button
              onClick={handleDelete}
              className="
                inline-flex
                justify-center
                items-center
                gap-2
                bg-red-600
                text-white
                px-5
                py-3
                rounded-xl
                font-semibold
                hover:bg-red-700
                transition
              "
            >
              <FiTrash2 />
              Delete
            </button>
          )}
        </div>
      </div>

      {/* MAIN JOB CARD */}

      <div
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
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:justify-between
            gap-5
          "
        >
          <div>
            <h1
              className="
                text-3xl
                sm:text-4xl
                font-bold
                text-slate-900
              "
            >
              {job.title}
            </h1>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              {job.category}
            </p>
          </div>

          <span
            className={`
              h-fit
              px-4
              py-2
              rounded-full
              border
              font-semibold
              text-sm
              ${getStatusStyle(job.status)}
            `}
          >
            {job.status.replace("_", " ")}
          </span>
        </div>

        <p
          className="
            mt-8
            text-slate-700
            leading-8
          "
        >
          {job.description}
        </p>
      </div>

      {/* INFORMATION GRID */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
      >
        {[
          {
            title: "Budget",
            value: `NPR ${job.budget}`,
            icon: <FiDollarSign />,
          },

          {
            title: "Location",
            value: job.location,
            icon: <FiMapPin />,
          },

          {
            title: "Deadline",
            value: new Date(job.deadline).toLocaleDateString(),
            icon: <FiCalendar />,
          },

          {
            title: "Category",
            value: job.category,
            icon: <FiTag />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="
              bg-white
              rounded-2xl
              border
              border-slate-200
              p-6
            "
          >
            <div
              className="
                text-emerald-600
                text-3xl
                mb-4
              "
            >
              {item.icon}
            </div>

            <p
              className="
                text-sm
                text-slate-500
              "
            >
              {item.title}
            </p>

            <h3
              className="
                mt-1
                font-bold
                text-lg
                text-slate-900
                break-words
              "
            >
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* SKILLS */}

      <div
        className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-6
          sm:p-8
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            text-slate-900
            mb-5
          "
        >
          Required Skills
        </h2>

        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >
          {job.skillsRequired?.map((skill) => (
            <span
              key={skill}
              className="
                px-4
                py-2
                rounded-full
                bg-emerald-50
                text-emerald-700
                border
                border-emerald-100
                font-medium
              "
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* APPLICANTS CTA */}

      {isOpen && (
        <div
          className="
            bg-white
            rounded-3xl
            border
            border-slate-200
            p-6
          "
        >
          <Link
            to={`/client/jobs/${job._id}/applicants`}
            className="
              inline-flex
              items-center
              gap-2
              bg-indigo-600
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:bg-indigo-700
              transition
            "
          >
            <FiUsers />
            View Applicants
          </Link>
        </div>
      )}

      {!isOpen && (
        <div
          className="
            bg-slate-50
            border
            border-slate-200
            rounded-2xl
            p-5
            text-center
            text-slate-600
          "
        >
          This job is currently {job.status.toLowerCase().replace("_", " ")}.
          Editing and deletion are disabled.
        </div>
      )}
    </div>
  );
};

export default JobDetails;
