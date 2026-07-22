import { useEffect, useMemo, useState } from "react";

import {
  FiSearch,
  FiMapPin,
  FiFilter,
  FiDollarSign,
  FiClock,
  FiBriefcase,
} from "react-icons/fi";

import { motion } from "framer-motion";

import WorkerJobCard from "../../components/job/WorkerJobCard";

import { getAllJobs } from "../../api/jobApi";

import { errorToast } from "../../utils/toast";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [location, setLocation] = useState("");

  const [budget, setBudget] = useState("");

  const [sort, setSort] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 6;

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const response = await getAllJobs();

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.log(error);

      errorToast("Unable to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    let data = [...jobs];

    if (search.trim()) {
      data = data.filter(
        (job) =>
          job.title?.toLowerCase().includes(search.toLowerCase()) ||
          job.description?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category) {
      data = data.filter(
        (job) => job.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    if (location) {
      data = data.filter((job) =>
        job.location?.toLowerCase().includes(location.toLowerCase()),
      );
    }

    if (budget) {
      data = data.filter((job) => Number(job.budget) >= Number(budget));
    }

    if (sort === "budget-high") {
      data.sort((a, b) => b.budget - a.budget);
    }

    if (sort === "budget-low") {
      data.sort((a, b) => a.budget - b.budget);
    }

    if (sort === "latest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return data;
  }, [jobs, search, category, location, budget, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, location, budget, sort]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * jobsPerPage;

    return filteredJobs.slice(start, start + jobsPerPage);
  }, [filteredJobs, currentPage]);

  const clearFilters = () => {
    setSearch("");

    setCategory("");

    setLocation("");

    setBudget("");

    setSort("");
  };

  if (loading) {
    return (
      <div
        className="
      h-96
      flex
      items-center
      justify-center
      "
      >
        <div className="text-center">
          <div
            className="
          h-14
          w-14
          mx-auto
          rounded-full
          border-4
          border-emerald-600
          border-t-transparent
          animate-spin
          "
          />

          <p className="mt-4 text-gray-500">Finding jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
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
bg-gradient-to-r
from-emerald-600
to-blue-600
rounded-3xl
p-8
text-white
shadow-xl
"
      >
        <h1
          className="
text-3xl
sm:text-4xl
font-bold
"
        >
          Find Your Next Job
        </h1>

        <p
          className="
mt-3
text-emerald-100
max-w-xl
"
        >
          Browse available projects and apply for jobs matching your skills.
        </p>

        <div
          className="
mt-6
inline-flex
items-center
gap-2
bg-white/20
px-5
py-3
rounded-xl
"
        >
          <FiBriefcase />
          {filteredJobs.length} Available Jobs
        </div>
      </motion.div>

      {/* FILTERS */}

      <div
        className="
bg-white
rounded-3xl
shadow-lg
border
p-6
"
      >
        <div
          className="
grid
md:grid-cols-2
xl:grid-cols-5
gap-4
"
        >
          <Input
            icon={<FiSearch />}
            placeholder="Search jobs"
            value={search}
            setValue={setSearch}
          />

          <Input
            icon={<FiFilter />}
            placeholder="Category"
            value={category}
            setValue={setCategory}
          />

          <Input
            icon={<FiMapPin />}
            placeholder="Location"
            value={location}
            setValue={setLocation}
          />

          <Input
            icon={<FiDollarSign />}
            placeholder="Minimum Budget"
            type="number"
            value={budget}
            setValue={setBudget}
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
border
rounded-xl
px-4
outline-none
"
          >
            <option value="">Sort</option>

            <option value="latest">Latest</option>

            <option value="budget-high">Highest Budget</option>

            <option value="budget-low">Lowest Budget</option>
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="
mt-5
px-5
py-2
rounded-xl
border
hover:bg-gray-100
"
        >
          Clear Filters
        </button>
      </div>

      {/* JOB LIST */}

      {paginatedJobs.length === 0 ? (
        <div
          className="
bg-white
rounded-3xl
shadow
p-12
text-center
"
        >
          <FiBriefcase
            className="
mx-auto
text-gray-300
text-6xl
"
          />

          <h2
            className="
text-2xl
font-bold
mt-5
"
          >
            No Jobs Found
          </h2>

          <p
            className="
text-gray-500
mt-2
"
          >
            Try changing your filters.
          </p>
        </div>
      ) : (
        <div
          className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
"
        >
          {paginatedJobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <WorkerJobCard job={job} />
            </motion.div>
          ))}
        </div>
      )}

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div
          className="
flex
justify-center
gap-3
"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="
px-5
py-2
rounded-xl
border
disabled:opacity-40
"
          >
            Previous
          </button>

          {Array.from(
            {
              length: totalPages,
            },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`
w-10
h-10
rounded-xl
${currentPage === i + 1 ? "bg-emerald-600 text-white" : "border"}
`}
              >
                {i + 1}
              </button>
            ),
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="
px-5
py-2
rounded-xl
border
disabled:opacity-40
"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const Input = ({ icon, placeholder, value, setValue, type = "text" }) => (
  <div
    className="
relative
"
  >
    <div
      className="
absolute
left-4
top-3.5
text-gray-400
"
    >
      {icon}
    </div>

    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="
w-full
border
rounded-xl
pl-11
py-3
outline-none
focus:ring-2
focus:ring-emerald-500
"
    />
  </div>
);

export default BrowseJobs;
