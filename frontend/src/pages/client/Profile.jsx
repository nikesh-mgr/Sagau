import { useEffect, useState } from "react";

import useClientStore from "../../store/clientStore";

import ClientLayout from "../../components/layouts/ClientLayout";
import ProfileCard from "../../components/client/ProfileCard";

import CreateProfile from "./CreateProfile";

const ClientDashboard = () => {
  const profile = useClientStore((state) => state.profile);
  const fetchProfile = useClientStore((state) => state.fetchProfile);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await fetchProfile();
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [fetchProfile]);

  return (
    <ClientLayout>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-xl font-semibold text-gray-500">Loading...</h2>
        </div>
      ) : profile ? (
        <ProfileCard profile={profile} />
      ) : (
        <CreateProfile />
      )}
    </ClientLayout>
  );
};

export default ClientDashboard;
