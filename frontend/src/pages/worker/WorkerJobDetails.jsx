import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WorkerLayout from "../../components/layouts/WorkerLayout";

import useJobStore from "../../store/jobStore";
import useApplicationStore from "../../store/applicationStore";

import { successToast, errorToast } from "../../utils/toast";

const WorkerJobDetails = () => {
  const { jobId } = useParams();

  const currentJob = useJobStore((state) => state.currentJob);
  const fetchSingleJob = useJobStore((state) => state.fetchSingleJob);

  const apply = useApplicationStore((state) => state.apply);

  const [formData, setFormData] = useState({
    bidAmount: "",
    proposalText: "",
    estimatedDays: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJob = async () => {
      try {
        await fetchSingleJob(jobId);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apply(jobId, {
        bidAmount: Number(formData.bidAmount),
        proposalText: formData.proposalText,
        estimatedDays: Number(formData.estimatedDays),
      });

      successToast("Application submitted successfully");

      setFormData({
        bidAmount: "",
        proposalText: "",
        estimatedDays: "",
      });
    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        errorToast(error.response.data.errors[0].msg);
      } else {
        errorToast(
          error.response?.data?.message || "Failed to submit application",
        );
      }
    }
  };

  if (loading) {
    return (
      <WorkerLayout>
        <h2>Loading...</h2>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="text-3xl font-bold">{currentJob.title}</h1>

          <p className="text-gray-600 mt-4">{currentJob.description}</p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <p className="font-semibold">Budget</p>
              <p>NPR {currentJob.budget}</p>
            </div>

            <div>
              <p className="font-semibold">Category</p>
              <p>{currentJob.category}</p>
            </div>

            <div>
              <p className="font-semibold">Location</p>
              <p>{currentJob.location}</p>
            </div>

            <div>
              <p className="font-semibold">Deadline</p>
              <p>{new Date(currentJob.deadline).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-lg mb-3">Required Skills</h3>

            <div className="flex flex-wrap gap-2">
              {currentJob.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow mt-8 p-8">
          <h2 className="text-2xl font-bold mb-6">Apply for this Job</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="number"
              name="bidAmount"
              placeholder="Your Bid Amount"
              value={formData.bidAmount}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <textarea
              rows="6"
              name="proposalText"
              placeholder="Write your proposal..."
              value={formData.proposalText}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              type="number"
              name="estimatedDays"
              placeholder="Estimated Completion Days"
              value={formData.estimatedDays}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
              Apply Now
            </button>
          </form>
        </div>
      </div>
    </WorkerLayout>
  );
};

export default WorkerJobDetails;
