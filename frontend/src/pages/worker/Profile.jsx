import { useEffect, useState } from "react";
import {
  FiStar,
  FiAward,
  FiUser,
  FiEdit,
  FiSave,
  FiMapPin,
  FiDollarSign,
  FiBriefcase,
  FiGlobe,
  FiPhone,
  FiMail,
} from "react-icons/fi";

import { getMyWorkerProfile, updateWorkerProfile } from "../../api/workerApi";
import { successToast, errorToast } from "../../utils/toast";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    experience: "",
    hourlyRate: "",
    location: "",
    availability: "Available",
    skills: "",
    bio: "",
    portfolio: "",
    phone: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getMyWorkerProfile();

      const data = response.data;

      setProfile(data);

      setFormData({
        experience: data.experience || "",
        hourlyRate: data.hourlyRate || "",
        location: data.location || "",
        availability: data.availability || "Available",
        skills: data.skills?.join(", ") || "",
        bio: data.bio || "",
        portfolio: data.portfolio?.join(", ") || "",
        phone: data.user?.phone || "",
      });
    } catch (error) {
      errorToast(error?.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        experience: Number(formData.experience),
        hourlyRate: Number(formData.hourlyRate),
        location: formData.location,
        availability: formData.availability,
        bio: formData.bio,

        skills: formData.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        portfolio: formData.portfolio
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        phone: formData.phone,
      };

      await updateWorkerProfile(payload);

      successToast("Profile updated successfully");

      setEditing(false);

      loadProfile();
    } catch (error) {
      errorToast(error?.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-500">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center">
        Worker profile not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-3xl font-bold text-emerald-700">
            {profile.user?.fullName?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-2xl font-bold">{profile.user?.fullName}</h1>

            <p className="text-gray-500">Professional Worker Profile</p>

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FiMapPin />
                {profile.location}
              </span>

              <span className="flex items-center gap-1">
                <FiBriefcase />
                {profile.experience} Years
              </span>

              <span className="flex items-center gap-1">
                <FiDollarSign />
                NPR {profile.hourlyRate}/hr
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 font-medium"
        >
          <FiEdit />

          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          icon={<FiStar />}
          title="Rating"
          value={profile.rating || 0}
          color="text-yellow-500"
        />

        <StatCard
          icon={<FiAward />}
          title="Reputation"
          value={profile.reputationScore || 0}
          color="text-emerald-600"
        />

        <StatCard
          icon={<FiUser />}
          title="Reviews"
          value={profile.totalReviews || 0}
          color="text-blue-600"
        />
      </div>
      {/* Main Information */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Worker Information</h2>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              <FiEdit />
              Edit
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <FiSave />
              Save
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Experience */}
          <InputField
            icon={<FiBriefcase />}
            label="Experience"
            name="experience"
            value={formData.experience}
            editing={editing}
            onChange={handleChange}
            suffix="Years"
          />

          {/* Hourly Rate */}
          <InputField
            icon={<FiDollarSign />}
            label="Hourly Rate"
            name="hourlyRate"
            value={formData.hourlyRate}
            editing={editing}
            onChange={handleChange}
            suffix="NPR/hr"
          />

          {/* Location */}
          <InputField
            icon={<FiMapPin />}
            label="Location"
            name="location"
            value={formData.location}
            editing={editing}
            onChange={handleChange}
          />

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-500 font-medium">
              Phone Number
            </label>

            <div className="mt-2 flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50">
              <FiPhone className="text-emerald-600" />

              <span className="font-medium">
                {profile.user?.phone || profile.phone || "Not Added"}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              This phone number is shown to clients only after a job is
              accepted.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500 font-medium">Email</label>

            <div className="mt-2 flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50">
              <FiMail className="text-blue-600" />

              <span className="font-medium">{profile.user?.email}</span>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="text-sm text-gray-500 font-medium">
              Availability
            </label>

            {editing ? (
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg px-4 py-3"
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Not Available">Not Available</option>
              </select>
            ) : (
              <div className="mt-2 border rounded-lg px-4 py-3 bg-gray-50 font-medium">
                {formData.availability}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <label className="text-sm text-gray-500 font-medium">Skills</label>

          {editing ? (
            <textarea
              rows={3}
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3"
            />
          ) : (
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.skills?.length ? (
                profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No skills added</p>
              )}
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="mt-8">
          <label className="text-sm text-gray-500 font-medium">
            Professional Bio
          </label>

          {editing ? (
            <textarea
              rows={5}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3"
            />
          ) : (
            <div className="mt-3 bg-gray-50 rounded-lg p-5 leading-7">
              {profile.bio || "No bio available"}
            </div>
          )}
        </div>

        {/* Portfolio */}
        <div className="mt-8">
          <label className="text-sm text-gray-500 font-medium">
            Portfolio Links
          </label>

          {editing ? (
            <textarea
              rows={3}
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://github.com/..., https://..."
              className="w-full mt-2 border rounded-lg p-3"
            />
          ) : (
            <div className="space-y-3 mt-3">
              {profile.portfolio?.length ? (
                profile.portfolio.map((link) => (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 hover:bg-emerald-50"
                  >
                    <FiGlobe className="text-emerald-600" />

                    <span className="truncate">{link}</span>
                  </a>
                ))
              ) : (
                <p className="text-gray-500">No portfolio links added</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className={`text-3xl ${color}`}>{icon}</div>

      <h3 className="text-3xl font-bold mt-4">{value}</h3>

      <p className="text-gray-500 mt-1">{title}</p>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  editing,
  onChange,
  icon,
  suffix,
}) => {
  return (
    <div>
      <label className="text-sm text-gray-500 font-medium">{label}</label>

      {editing ? (
        <div className="relative mt-2">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </span>
          )}

          <input
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full border rounded-lg py-3 ${
              icon ? "pl-10" : "pl-4"
            } ${suffix ? "pr-16" : "pr-4"} focus:ring-2 focus:ring-emerald-500 outline-none`}
          />

          {suffix && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {suffix}
            </span>
          )}
        </div>
      ) : (
        <div className="mt-2 border rounded-lg bg-gray-50 px-4 py-3 font-medium">
          {value || "Not Added"}
        </div>
      )}
    </div>
  );
};

export default Profile;
