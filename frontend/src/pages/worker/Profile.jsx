import { useEffect } from "react";

import useWorkerStore from "../../store/workerStore";

import WorkerProfileCard from "../../components/worker/WorkerProfileCard";

const Profile = () => {
  const profile = useWorkerStore((state) => state.profile);
  const fetchProfile = useWorkerStore((state) => state.fetchProfile);

  useEffect(() => {
    fetchProfile().catch(() => {});
  }, []);

  if (!profile) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <WorkerProfileCard profile={profile} />
    </div>
  );
};

export default Profile;
