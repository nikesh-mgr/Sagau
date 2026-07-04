import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Client Profile</h2>

        <Link
          to="/client/profile/edit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>
      </div>

      <div className="space-y-3">
        <p>
          <strong>Name:</strong> {profile?.user?.fullName}
        </p>

        <p>
          <strong>Email:</strong> {profile?.user?.email}
        </p>

        <p>
          <strong>Address:</strong> {profile?.address}
        </p>

        <p>
          <strong>Phone:</strong> {profile?.phone}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
