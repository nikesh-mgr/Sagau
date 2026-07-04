import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

const WorkerProfileCard = ({ profile }) => {
  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow p-6">Loading profile...</div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">{profile.user?.fullName}</h2>

          <p className="text-gray-500">{profile.user?.email}</p>

          <p className="mt-4">{profile.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="flex items-center gap-3">
          <FaMoneyBillWave />
          NPR {profile.hourlyRate}/hr
        </div>

        <div className="flex items-center gap-3">
          <FaMapMarkerAlt />
          {profile.location}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {profile.skills?.map((skill) => (
          <span
            key={skill}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WorkerProfileCard;
