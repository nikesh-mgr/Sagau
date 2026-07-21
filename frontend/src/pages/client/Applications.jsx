import { useEffect, useState } from "react";

import { FiSearch, FiUsers } from "react-icons/fi";

import ApplicantCard from "../../components/application/ApplicantCard";

import { getClientApplications } from "../../api/applicationApi";

import { errorToast } from "../../utils/toast";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  const [filteredApplications, setFilteredApplications] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [search, applications]);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const response = await getClientApplications();

      setApplications(response.data);

      setFilteredApplications(response.data);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let data = [...applications];

    if (search.trim()) {
      data = data.filter(
        (application) =>
          application.worker?.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          application.job?.title?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredApplications(data);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading Applications...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Applications</h1>

        <p className="text-gray-500 mt-2">
          Review workers who applied to your jobs.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <div className="relative">
          <FiSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search worker or job..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-16 text-center">
          <FiUsers size={60} className="mx-auto text-gray-300 mb-5" />

          <h2 className="text-2xl font-bold">No Applications Found</h2>

          <p className="text-gray-500 mt-3">
            No workers have applied to your jobs yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <ApplicantCard
              key={application._id}
              application={application}
              refresh={loadApplications}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
