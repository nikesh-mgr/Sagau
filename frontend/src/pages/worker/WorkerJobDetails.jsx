import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiArrowLeft,
  FiCheckCircle,
  FiBriefcase,
} from "react-icons/fi";

import { motion } from "framer-motion";

import { getSingleJob } from "../../api/jobApi";

import { errorToast } from "../../utils/toast";

const WorkerJobDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      setLoading(true);

      const response = await getSingleJob(id);

      setJob(response.data);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString();
  };

  const statusStyle = {
    OPEN: "bg-green-100 text-green-700",

    IN_PROGRESS: "bg-blue-100 text-blue-700",

    COMPLETED: "bg-gray-100 text-gray-700",

    CANCELLED: "bg-red-100 text-red-700",
  };

  if (loading) {
    return (
      <div
        className="
      h-96
      flex
      justify-center
      items-center
      "
      >
        <div
          className="
        h-12
        w-12
        border-4
        border-emerald-600
        border-t-transparent
        rounded-full
        animate-spin
        "
        />
      </div>
    );
  }

  if (!job) {
    return (
      <div
        className="
      text-center
      py-20
      "
      >
        <h2
          className="
        text-3xl
        font-bold
        "
        >
          Job Not Found
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="
        mt-6
        px-6
        py-3
        bg-emerald-600
        text-white
        rounded-xl
        "
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="
space-y-8
"
    >
      {/* BACK */}

      <button
        onClick={() => navigate(-1)}
        className="
flex
items-center
gap-2
text-emerald-600
font-semibold
"
      >
        <FiArrowLeft />
        Back
      </button>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
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
overflow-hidden
"
      >
        {/* HEADER */}

        <div
          className="
bg-gradient-to-r
from-emerald-600
to-blue-600
p-8
text-white
"
        >
          <div
            className="
flex
justify-between
gap-5
flex-wrap
"
          >
            <div>
              <div
                className="
flex
items-center
gap-3
mb-4
"
              >
                <div
                  className="
h-12
w-12
rounded-xl
bg-white/20
flex
items-center
justify-center
"
                >
                  <FiBriefcase size={25} />
                </div>

                <h1
                  className="
text-3xl
sm:text-4xl
font-bold
"
                >
                  {job.title}
                </h1>
              </div>

              <p
                className="
text-emerald-100
"
              >
                {job.category}
              </p>
            </div>

            <span
              className={`
px-5
py-2
rounded-full
font-semibold
h-fit
${statusStyle[job.status]}
`}
            >
              {job.status}
            </span>
          </div>
        </div>

        {/* DETAILS */}

        <div
          className="
p-6
sm:p-8
"
        >
          <div
            className="
grid
md:grid-cols-2
xl:grid-cols-4
gap-6
"
          >
            <Info
              icon={<FiDollarSign />}
              title="Budget"
              value={`NPR ${job.budget}`}
            />

            <Info icon={<FiMapPin />} title="Location" value={job.location} />

            <Info
              icon={<FiCalendar />}
              title="Deadline"
              value={formatDate(job.deadline)}
            />

            <Info
              icon={<FiUser />}
              title="Client"
              value={job.client?.fullName || "Client"}
            />
          </div>

          {/* DESCRIPTION */}

          <div
            className="
mt-10
"
          >
            <h2
              className="
text-2xl
font-bold
mb-4
"
            >
              Job Description
            </h2>

            <p
              className="
text-gray-600
leading-8
whitespace-pre-line
"
            >
              {job.description}
            </p>
          </div>

          {/* SKILLS */}

          <div
            className="
mt-10
"
          >
            <h2
              className="
text-2xl
font-bold
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
              {job.skillsRequired?.length ? (
                job.skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="
px-4
py-2
rounded-full
bg-emerald-100
text-emerald-700
font-medium
"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No specific skills mentioned</p>
              )}
            </div>
          </div>

          {/* ACTION */}

          <div
            className="
mt-12
border-t
pt-8
"
          >
            <div
              className="
bg-slate-50
rounded-3xl
p-6
"
            >
              <h3
                className="
text-xl
font-bold
"
              >
                Ready to work?
              </h3>

              <p
                className="
text-gray-600
mt-3
leading-7
"
              >
                Submit your proposal and show the client why you are the right
                person.
              </p>

              {job.status === "OPEN" ? (
                <button
                  onClick={() => navigate(`/worker/jobs/${job._id}/apply`)}
                  className="
mt-6
w-full
bg-emerald-600
text-white
py-4
rounded-xl
font-semibold
hover:bg-emerald-700
transition
flex
justify-center
items-center
gap-2
"
                >
                  <FiCheckCircle />
                  Apply For This Job
                </button>
              ) : (
                <button
                  disabled
                  className="
mt-6
w-full
bg-gray-300
text-gray-600
py-4
rounded-xl
"
                >
                  Applications Closed
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Info = ({ icon, title, value }) => (
  <div
    className="
flex
gap-4
items-center
"
  >
    <div
      className="
h-12
w-12
rounded-xl
bg-emerald-100
text-emerald-600
flex
items-center
justify-center
text-xl
"
    >
      {icon}
    </div>

    <div>
      <p
        className="
text-gray-500
text-sm
"
      >
        {title}
      </p>

      <p
        className="
font-bold
mt-1
"
      >
        {value || "N/A"}
      </p>
    </div>
  </div>
);

export default WorkerJobDetails;
