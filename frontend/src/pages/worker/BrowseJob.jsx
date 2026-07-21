import { useEffect, useMemo, useState } from "react";

import WorkerJobCard from "../../components/job/WorkerJobCard";

import { getAllJobs } from "../../api/jobApi";

import { errorToast } from "../../utils/toast";

import { FiSearch, FiMapPin, FiFilter, FiDollarSign } from "react-icons/fi";

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [location, setLocation] = useState("");

  const [budget, setBudget] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 6;

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, search, category, location, budget]);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const response = await getAllJobs();

      setJobs(response.data.jobs);

      setFilteredJobs(response.data.jobs);
    } catch (error) {
      console.log(error);

      errorToast("Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let data = [...jobs];

    if (search.trim() !== "") {
      data = data.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== "") {
      data = data.filter(
        (job) => job.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (location !== "") {
      data = data.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase()),
      );
    }

    if (budget !== "") {
      data = data.filter((job) => Number(job.budget) >= Number(budget));
    }

    setFilteredJobs(data);

    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * jobsPerPage;

    return filteredJobs.slice(start, start + jobsPerPage);
  }, [filteredJobs, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-lg font-medium">
        Loading Jobs...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Browse Jobs</h1>

        <p className="text-gray-500 mt-2">
          Find the best freelance and local work opportunities.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="relative">
            <FiSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <FiFilter className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <FiMapPin className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <FiDollarSign className="absolute left-4 top-4 text-gray-400" />

            <input
              type="number"
              placeholder="Minimum Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>{" "}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Available Jobs</h2>

          <p className="text-gray-500 mt-1">
            Showing {filteredJobs.length} job
            {filteredJobs.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            setLocation("");
            setBudget("");
          }}
          className="px-5 py-2 rounded-xl border hover:bg-gray-100 transition"
        >
          Clear Filters
        </button>
      </div>
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-card p-16 text-center">
          <h2 className="text-2xl font-bold mb-3">No Jobs Found</h2>

          <p className="text-gray-500">
            Try changing your search or filter options.
          </p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedJobs.map((job) => (
              <WorkerJobCard key={job._id} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
                className={`px-5 py-2 rounded-xl border transition ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-11 h-11 rounded-xl transition ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "border hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
                className={`px-5 py-2 rounded-xl border transition ${
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}{" "}
    </div>
  );
};

export default BrowseJobs;
