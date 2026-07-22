import { Link } from "react-router-dom";

import {
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiTag,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";

const WorkerJobCard = ({ job }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
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

  return (
    <div
      className="
        group
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        overflow-hidden
      "
    >
      {/* HEADER */}

      <div
        className="
          p-6
        "
      >
        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-start
            sm:justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              gap-4
            "
          >
            <div
              className="
                h-14
                w-14
                rounded-2xl
                bg-gradient-to-br
                from-emerald-500
                to-green-600
                text-white
                flex
                items-center
                justify-center
                shadow-md
                shrink-0
              "
            >
              <FiBriefcase className="text-2xl" />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900
                  group-hover:text-emerald-600
                  transition
                  line-clamp-2
                "
              >
                {job.title}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >
                {job.category}
              </p>
            </div>
          </div>

          <span
            className={`
              px-3
              py-1.5
              rounded-full
              text-xs
              font-semibold
              border
              ${getStatusStyle(job.status)}
            `}
          >
            {job.status.replace("_", " ")}
          </span>
        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-6
            text-slate-600
            leading-relaxed
            line-clamp-3
          "
        >
          {job.description}
        </p>

        {/* JOB INFORMATION */}

        <div
          className="
            mt-6
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-slate-50
              p-3
            "
          >
            <FiDollarSign
              className="
                text-emerald-600
                text-xl
              "
            />

            <div>
              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Budget
              </p>

              <p
                className="
                  font-semibold
                  text-slate-900
                "
              >
                NPR {job.budget}
              </p>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-slate-50
              p-3
            "
          >
            <FiMapPin
              className="
                text-blue-600
                text-xl
              "
            />

            <div>
              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Location
              </p>

              <p
                className="
                  font-semibold
                  text-slate-900
                  truncate
                "
              >
                {job.location}
              </p>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-slate-50
              p-3
            "
          >
            <FiCalendar
              className="
                text-purple-600
                text-xl
              "
            />

            <div>
              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Deadline
              </p>

              <p
                className="
                  font-semibold
                  text-slate-900
                "
              >
                {formatDate(job.deadline)}
              </p>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              bg-slate-50
              p-3
            "
          >
            <FiTag
              className="
                text-orange-600
                text-xl
              "
            />

            <div>
              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                Required Skills
              </p>

              <p
                className="
                  font-semibold
                  text-slate-900
                "
              >
                {job.skillsRequired?.length || 0} Skills
              </p>
            </div>
          </div>
        </div>

        {/* SKILLS */}

        <div
          className="
            flex
            flex-wrap
            gap-2
            mt-6
          "
        >
          {job.skillsRequired?.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="
                px-3
                py-1.5
                rounded-full
                bg-emerald-50
                text-emerald-700
                text-sm
                font-medium
                border
                border-emerald-100
              "
            >
              {skill}
            </span>
          ))}

          {job.skillsRequired?.length > 5 && (
            <span
              className="
                px-3
                py-1.5
                rounded-full
                bg-slate-100
                text-slate-600
                text-sm
              "
            >
              +{job.skillsRequired.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* ACTION AREA */}

      <div
        className="
          border-t
          border-slate-100
          p-5
          flex
          flex-col
          sm:flex-row
          gap-3
          sm:items-center
          sm:justify-between
        "
      >
        <Link
          to={`/worker/jobs/${job._id}`}
          className="
            text-emerald-600
            font-semibold
            hover:text-emerald-700
            transition
          "
        >
          View Details
        </Link>

        {job.status === "OPEN" && (
          <Link
            to={`/worker/jobs/${job._id}/apply`}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-emerald-600
              text-white
              px-6
              py-3
              font-semibold
              hover:bg-emerald-700
              hover:shadow-lg
              transition
            "
          >
            Apply Now
            <FiArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
};

export default WorkerJobCard;
