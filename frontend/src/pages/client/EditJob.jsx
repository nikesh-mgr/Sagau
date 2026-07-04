import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ClientLayout from "../../components/layouts/ClientLayout";

import useJobStore from "../../store/jobStore";

import { successToast, errorToast } from "../../utils/toast";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const currentJob = useJobStore((state) => state.currentJob);
  const fetchSingleJob = useJobStore((state) => state.fetchSingleJob);
  const updateJob = useJobStore((state) => state.updateJob);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    skillsRequired: "",
    location: "",
    deadline: "",
    category: "",
  });

  useEffect(() => {
    const loadJob = async () => {
      const job = await fetchSingleJob(jobId);

      setFormData({
        title: job.title || "",
        description: job.description || "",
        budget: job.budget || "",
        skillsRequired: job.skillsRequired.join(", "),
        location: job.location || "",
        deadline: job.deadline ? job.deadline.substring(0, 10) : "",
        category: job.category || "",
      });
    };

    loadJob();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateJob(jobId, {
        ...formData,
        budget: Number(formData.budget),
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      successToast("Job updated successfully");

      navigate("/client/jobs");
    } catch (error) {
      console.error(error);

      errorToast(error.response?.data?.message || "Failed to update job");
    }
  };

  return (
    <ClientLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Edit Job</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows="5"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="skillsRequired"
            placeholder="React, Node, MongoDB"
            value={formData.skillsRequired}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
            Update Job
          </button>
        </form>
      </div>
    </ClientLayout>
  );
};

export default EditJob;
