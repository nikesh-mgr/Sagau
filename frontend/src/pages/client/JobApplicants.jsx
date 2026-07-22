import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { FiUsers, FiArrowLeft, FiUserX } from "react-icons/fi";

import { motion } from "framer-motion";

import ApplicantCard from "../../components/application/ApplicantCard";

import { getJobApplications } from "../../api/applicationApi";

import { errorToast } from "../../utils/toast";

const JobApplicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const response = await getJobApplications(jobId);

      setApplications(response.data || []);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="
        min-h-[500px]
        flex
        items-center
        justify-center
        "
      >
        <div
          className="
          text-center
          "
        >
          <div
            className="
            h-14
            w-14
            mx-auto
            rounded-full
            border-4
            border-blue-600
            border-t-transparent
            animate-spin
            "
          />

          <p
            className="
            mt-5
            text-slate-500
            font-medium
            "
          >
            Loading Applicants...
          </p>
        </div>
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
        max-w-6xl
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
              from-indigo-500
              to-purple-600
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              "
            >
              <FiUsers
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
                Job Applicants
              </h1>

              <p
                className="
                mt-2
                text-slate-500
                "
              >
                Review worker proposals and hire the best candidate.
              </p>
            </div>
          </div>
        </motion.div>

        {/* EMPTY STATE */}

        {applications.length === 0 ? (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
            bg-white
            rounded-3xl
            shadow-lg
            border
            border-slate-200
            p-10
            sm:p-16
            text-center
            "
          >
            <div
              className="
              h-20
              w-20
              mx-auto
              rounded-full
              bg-slate-100
              flex
              items-center
              justify-center
              "
            >
              <FiUserX
                className="
                text-4xl
                text-slate-400
                "
              />
            </div>

            <h2
              className="
              mt-6
              text-2xl
              font-bold
              text-slate-900
              "
            >
              No Applicants Yet
            </h2>

            <p
              className="
              mt-3
              text-slate-500
              "
            >
              Workers haven't applied to this job yet.
            </p>
          </motion.div>
        ) : (
          <div
            className="
            space-y-6
            "
          >
            {applications.map((application) => (
              <motion.div
                key={application._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <ApplicantCard
                  application={application}
                  refresh={loadApplications}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
