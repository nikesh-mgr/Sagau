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
  FiMail,
} from "react-icons/fi";

import { getMyWorkerProfile, updateWorkerProfile } from "../../api/workerApi";

import { successToast, errorToast } from "../../utils/toast";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [updating, setUpdating] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [previewImage, setPreviewImage] = useState("");

  const [formData, setFormData] = useState({
    experience: "",

    hourlyRate: "",

    location: "",

    phone: "",

    availability: "Available",

    skills: "",

    bio: "",

    portfolio: "",
  });

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    loadProfile();

    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // =====================================================
  // Load Worker Profile
  // =====================================================

  const loadProfile = async () => {
    try {
      const response = await getMyWorkerProfile();

      const data = response.data;

      setProfile(data);

      setFormData({
        experience: data.experience || "",

        hourlyRate: data.hourlyRate || "",

        location: data.location || "",

        phone: data.phone || "",

        availability: data.availability || "Available",

        skills: data.skills?.join(", ") || "",

        bio: data.bio || "",

        portfolio: data.portfolio?.join(", ") || "",
      });

      if (data.profileImage) {
        setPreviewImage(`${API_URL}${data.profileImage}`);
      }

      console.log("Worker Profile:", data);
    } catch (error) {
      errorToast(error?.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // Input Change
  // =====================================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  // =====================================================
  // Image Change
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      errorToast("Only JPG, PNG and WEBP allowed");

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      errorToast("Image must be below 5MB");

      return;
    }

    setSelectedImage(file);

    setPreviewImage(URL.createObjectURL(file));
  };

  // =====================================================
  // Update Worker Profile
  // =====================================================

  const handleUpdate = async () => {
    try {
      setUpdating(true);

      const data = new FormData();

      data.append("experience", formData.experience);

      data.append("hourlyRate", formData.hourlyRate);

      data.append("location", formData.location);

      data.append("phone", formData.phone);

      data.append("availability", formData.availability);

      data.append("bio", formData.bio);

      formData.skills

        .split(",")

        .map((item) => item.trim())

        .filter(Boolean)

        .forEach((skill) => {
          data.append("skills", skill);
        });

      formData.portfolio

        .split(",")

        .map((item) => item.trim())

        .filter(Boolean)

        .forEach((link) => {
          data.append("portfolio", link);
        });

      if (selectedImage) {
        data.append("profileImage", selectedImage);
      }

      console.log("========== UPDATE FORM DATA ==========");

      for (const [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(key, value.name, value.type, value.size);
        } else {
          console.log(key, value);
        }
      }

      await updateWorkerProfile(data);

      successToast("Profile updated successfully");

      setEditing(false);

      setSelectedImage(null);

      loadProfile();
    } catch (error) {
      console.log(error);

      errorToast(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />

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
          <div className="relative">
            <img
              src={previewImage || "https://placehold.co/150x150?text=Photo"}
              alt="Worker Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500"
            />

            {editing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
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
          className="px-5 py-3 rounded-xl bg-emerald-600 text-white flex items-center gap-2"
        >
          <FiEdit />

          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-5">
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

      {/* Information */}

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Worker Information</h2>

          {editing ? (
            <button
              onClick={handleUpdate}
              disabled={updating}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <FiSave />

              {updating ? "Saving..." : "Save"}
            </button>
          ) : null}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <InputField
            label="Experience"
            name="experience"
            value={formData.experience}
            editing={editing}
            onChange={handleChange}
            icon={<FiBriefcase />}
            suffix="Years"
          />

          <InputField
            label="Hourly Rate"
            name="hourlyRate"
            value={formData.hourlyRate}
            editing={editing}
            onChange={handleChange}
            icon={<FiDollarSign />}
            suffix="NPR/hr"
          />

          <InputField
            label="Location"
            name="location"
            value={formData.location}
            editing={editing}
            onChange={handleChange}
            icon={<FiMapPin />}
          />

          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            editing={editing}
            onChange={handleChange}
          />
        </div>

        {/* Availability */}

        <div className="mt-6">
          <label className="text-sm text-gray-500">Availability</label>

          {editing ? (
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl px-4 py-3"
            >
              <option value="Available">Available</option>

              <option value="Busy">Busy</option>

              <option value="Not Available">Not Available</option>
            </select>
          ) : (
            <div className="mt-2 bg-gray-50 border rounded-xl px-4 py-3">
              {profile.availability}
            </div>
          )}
        </div>

        {/* Skills */}

        <div className="mt-8">
          <label className="text-sm text-gray-500">Skills</label>

          {editing ? (
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows={3}
              className="w-full mt-2 border rounded-xl p-4"
            />
          ) : (
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.skills?.map((skill) => (
                <span
                  key={skill}
                  className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bio */}

        <div className="mt-8">
          <label className="text-sm text-gray-500">Professional Bio</label>

          {editing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              className="w-full mt-2 border rounded-xl p-4"
            />
          ) : (
            <div className="mt-3 bg-gray-50 rounded-xl p-5">{profile.bio}</div>
          )}
        </div>

        {/* Portfolio */}

        <div className="mt-8">
          <label className="text-sm text-gray-500">Portfolio Links</label>

          {editing ? (
            <textarea
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              rows={3}
              className="w-full mt-2 border rounded-xl p-4"
            />
          ) : (
            <div className="space-y-3 mt-3">
              {profile.portfolio?.map((link) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3"
                >
                  <FiGlobe />

                  {link}
                </a>
              ))}
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

      <p className="text-gray-500">{title}</p>
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
      <label className="text-sm text-gray-500">{label}</label>

      {editing ? (
        <div className="relative mt-2">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              {icon}
            </span>
          )}

          <input
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border rounded-xl px-10 py-3"
          />
        </div>
      ) : (
        <div className="mt-2 bg-gray-50 border rounded-xl px-4 py-3">
          {value || "Not Added"}
        </div>
      )}
    </div>
  );
};

export default Profile;
