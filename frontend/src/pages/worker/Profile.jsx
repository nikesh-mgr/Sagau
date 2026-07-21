import { useEffect, useState } from "react";

import {
  FiStar,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiAward,
} from "react-icons/fi";

import { getMyWorkerProfile } from "../../api/workerApi";

import { errorToast } from "../../utils/toast";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getMyWorkerProfile();

      setProfile(response.data);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex justify-center items-center">
        Loading Profile...
      </div>
    );
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>

        <p className="text-gray-500 mt-2">Manage your worker information.</p>
      </div>

      {/* Rating Section */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <FiStar size={30} className="text-yellow-500" />

          <h2 className="text-3xl font-bold mt-3">{profile.rating}</h2>

          <p className="text-gray-500">Rating</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FiAward size={30} className="text-primary" />

          <h2 className="text-3xl font-bold mt-3">{profile.reputationScore}</h2>

          <p className="text-gray-500">Reputation Score</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-3xl font-bold">{profile.totalReviews}</h2>

          <p className="text-gray-500">Reviews</p>
        </div>
      </div>

      {/* Profile Details */}

      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold mb-8">Worker Information</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <FiBriefcase size={25} />

            <div>
              <p className="text-gray-500">Experience</p>

              <p className="font-semibold">{profile.experience} Years</p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiDollarSign size={25} />

            <div>
              <p className="text-gray-500">Hourly Rate</p>

              <p className="font-semibold">NPR {profile.hourlyRate}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiMapPin size={25} />

            <div>
              <p className="text-gray-500">Location</p>

              <p className="font-semibold">{profile.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-bold mb-3">Skills</h3>

          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="bg-emerald-50 text-primary px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-bold mb-3">Bio</h3>

          <p className="text-gray-600">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
