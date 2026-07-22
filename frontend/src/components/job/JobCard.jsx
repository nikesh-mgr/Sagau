import { Link } from "react-router-dom";

import {
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiEye,
  FiEdit,
  FiTrash2,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";

import { motion } from "framer-motion";

const JobCard = ({ job, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "IN_PROGRESS":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "COMPLETED":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "CLOSED":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (confirmDelete) {
      onDelete(job._id);
    }
  };

  const isOpen = job.status === "OPEN";

  return (
    <motion.article
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
      group
      overflow-hidden
      rounded-3xl
      border
      border-gray-100
      bg-white
      shadow-sm
      transition
      hover:shadow-xl
      "
    >
      {/* HEADER */}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div
              className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-emerald-500
            to-teal-600
            text-white
            shadow-lg
            "
            >
              <FiBriefcase size={24} />
            </div>

            <div>
              <h2
                className="
              line-clamp-2
              text-xl
              font-bold
              text-gray-900
              "
              >
                {job.title}
              </h2>

              <p
                className="
              mt-1
              text-sm
              text-gray-500
              "
              >
                {job.category}
              </p>
            </div>
          </div>

          <span
            className={`
          shrink-0
          rounded-full
          border
          px-3
          py-1
          text-xs
          font-semibold
          ${getStatusColor(job.status)}
          `}
          >
            {job.status.replace("_", " ")}
          </span>
        </div>

        {/* DESCRIPTION */}

        <p
          className="
        mt-5
        line-clamp-3
        text-sm
        leading-relaxed
        text-gray-600
        "
        >
          {job.description}
        </p>

        {/* JOB INFORMATION */}

        <div
          className="
        mt-6
        grid
        grid-cols-2
        gap-4
        "
        >
          <InfoItem
            icon={<FiDollarSign />}
            title="Budget"
            value={`NPR ${job.budget}`}
            color="green"
          />

          <InfoItem
            icon={<FiMapPin />}
            title="Location"
            value={job.location}
            color="blue"
          />

          <InfoItem
            icon={<FiCalendar />}
            title="Deadline"
            value={new Date(job.deadline).toLocaleDateString()}
            color="purple"
          />

          <InfoItem
            icon={<FiBriefcase />}
            title="Skills"
            value={`${job.skillsRequired?.length || 0} skills`}
            color="orange"
          />
        </div>

        {/* SKILLS */}

        <div
          className="
        mt-6
        flex
        flex-wrap
        gap-2
        "
        >
          {job.skillsRequired?.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="
              rounded-full
              bg-emerald-50
              px-3
              py-1
              text-xs
              font-medium
              text-emerald-700
              "
            >
              {skill}
            </span>
          ))}

          {job.skillsRequired?.length > 5 && (
            <span
              className="
            rounded-full
            bg-gray-100
            px-3
            py-1
            text-xs
            text-gray-600
            "
            >
              +{job.skillsRequired.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* ACTIONS */}

      <div
        className="
      border-t
      border-gray-100
      bg-gray-50/50
      p-5
      "
      >
        <div
          className="
        grid
        grid-cols-2
        gap-3
        "
        >
          <Link
            to={`/client/jobs/${job._id}`}
            className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            py-3
            font-semibold
            text-gray-700
            transition
            hover:border-emerald-600
            hover:text-emerald-600
            "
          >
            <FiEye />
            View
          </Link>

          {isOpen && (
            <Link
              to={`/client/jobs/${job._id}/applicants`}
              className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-emerald-600
              py-3
              font-semibold
              text-white
              transition
              hover:bg-emerald-700
              "
            >
              <FiUsers />
              Applicants
            </Link>
          )}

          {isOpen && (
            <Link
              to={`/client/jobs/edit/${job._id}`}
              className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              py-3
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              "
            >
              <FiEdit />
              Edit
            </Link>
          )}

          {isOpen && (
            <button
              onClick={handleDelete}
              className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-50
              py-3
              font-semibold
              text-red-600
              transition
              hover:bg-red-100
              "
            >
              <FiTrash2 />
              Delete
            </button>
          )}
        </div>

        {!isOpen && (
          <p
            className="
          mt-4
          rounded-xl
          bg-gray-100
          px-4
          py-3
          text-center
          text-sm
          text-gray-500
          "
          >
            This job is currently {job.status.toLowerCase().replace("_", " ")}.
            Management actions are disabled.
          </p>
        )}
      </div>
    </motion.article>
  );
};

const InfoItem = ({ icon, title, value }) => {
  return (
    <div
      className="
    flex
    items-center
    gap-3
    "
    >
      <div
        className="
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-xl
      bg-gray-100
      text-emerald-600
      "
      >
        {icon}
      </div>

      <div>
        <p
          className="
        text-xs
        text-gray-500
        "
        >
          {title}
        </p>

        <p
          className="
        max-w-[120px]
        truncate
        text-sm
        font-semibold
        text-gray-900
        "
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
