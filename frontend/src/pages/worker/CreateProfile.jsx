import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useWorkerStore from "../../store/workerStore";

import { successToast, errorToast } from "../../utils/toast";

const CreateProfile = () => {
  const navigate = useNavigate();

  const createProfile = useWorkerStore((state) => state.createProfile);

  const [formData, setFormData] = useState({
    skills: "",
    bio: "",
    experience: "",
    hourlyRate: "",
    location: "",
    availability: "Available",
    portfolio: "",
  });

  const [errors, setErrors] = useState({});

  const isValid =
    formData.bio.length >= 20 &&
    formData.skills.trim() !== "" &&
    Number(formData.hourlyRate) > 0 &&
    formData.location.trim() !== "";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProfile({
        ...formData,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        portfolio: formData.portfolio
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        experience: Number(formData.experience),
        hourlyRate: Number(formData.hourlyRate),
      });

      successToast("Worker profile created successfully");

      navigate("/worker");
    } catch (error) {
      console.error("WORKER PROFILE ERROR", error);

      if (error.response?.data?.errors) {
        const backendErrors = {};

        error.response.data.errors.forEach((err) => {
          backendErrors[err.path] = err.msg;
        });

        setErrors(backendErrors);

        errorToast(error.response.data.errors[0].msg);

        return;
      }

      errorToast(
        error.response?.data?.message || "Failed to create worker profile",
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-8">Create Worker Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Skills */}

        <div>
          <input
            type="text"
            name="skills"
            placeholder="React, Node.js, MongoDB"
            value={formData.skills}
            onChange={handleChange}
            className={`w-full border rounded p-3 ${
              errors.skills ? "border-red-500" : ""
            }`}
          />

          {errors.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
          )}
        </div>

        {/* Bio */}

        <div>
          <textarea
            name="bio"
            placeholder="Tell clients about yourself..."
            rows={5}
            value={formData.bio}
            onChange={handleChange}
            className={`w-full border rounded p-3 ${
              errors.bio ? "border-red-500" : ""
            }`}
          />

          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
          )}
        </div>

        {/* Experience */}

        <div>
          <input
            type="number"
            name="experience"
            placeholder="Experience (Years)"
            value={formData.experience}
            onChange={handleChange}
            className={`w-full border rounded p-3 ${
              errors.experience ? "border-red-500" : ""
            }`}
          />

          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
          )}
        </div>

        {/* Hourly Rate */}

        <div>
          <input
            type="number"
            name="hourlyRate"
            placeholder="Hourly Rate"
            value={formData.hourlyRate}
            onChange={handleChange}
            className={`w-full border rounded p-3 ${
              errors.hourlyRate ? "border-red-500" : ""
            }`}
          />

          {errors.hourlyRate && (
            <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>
          )}
        </div>

        {/* Location */}

        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full border rounded p-3 ${
              errors.location ? "border-red-500" : ""
            }`}
          />

          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Availability */}

        <div>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full border rounded p-3"
          >
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        {/* Portfolio */}

        <div>
          <input
            type="text"
            name="portfolio"
            placeholder="Portfolio Links (comma separated)"
            value={formData.portfolio}
            onChange={handleChange}
            className={`w-full border rounded p-3 ${
              errors.portfolio ? "border-red-500" : ""
            }`}
          />

          {errors.portfolio && (
            <p className="text-red-500 text-sm mt-1">{errors.portfolio}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full text-white p-3 rounded transition ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
