import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useWorkerStore from "../../store/workerStore";

import { successToast, errorToast } from "../../utils/toast";

const EditProfile = () => {
  const navigate = useNavigate();

  const profile = useWorkerStore((state) => state.profile);

  const fetchProfile = useWorkerStore((state) => state.fetchProfile);

  const updateProfile = useWorkerStore((state) => state.updateProfile);

  const [formData, setFormData] = useState({
    skills: "",
    bio: "",
    experience: "",
    hourlyRate: "",
    location: "",
    availability: "Available",
    portfolio: "",
  });

  useEffect(() => {
    const load = async () => {
      let data = profile;

      if (!data) {
        data = await fetchProfile();
      }

      setFormData({
        skills: data.skills?.join(", ") || "",
        bio: data.bio || "",
        experience: data.experience || "",
        hourlyRate: data.hourlyRate || "",
        location: data.location || "",
        availability: data.availability || "Available",
        portfolio: data.portfolio?.join(", ") || "",
      });
    };

    load();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({
        ...formData,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),

        portfolio: formData.portfolio
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),

        experience: Number(formData.experience),
        hourlyRate: Number(formData.hourlyRate),
      });

      successToast("Profile Updated");

      navigate("/worker");
    } catch (error) {
      errorToast(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Worker Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <textarea
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <input
          type="number"
          name="hourlyRate"
          value={formData.hourlyRate}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full border rounded p-3"
        >
          <option>Available</option>
          <option>Busy</option>
          <option>Not Available</option>
        </select>

        <input
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <button className="w-full bg-blue-600 text-white rounded p-3">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
