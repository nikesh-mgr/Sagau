import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

import { getClientProfile } from "../api/clientApi";
import { getMyWorkerProfile } from "../api/workerApi";

const ProfileCompleteRoute = ({ role, children }) => {
  const user = useAuthStore((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      let response;

      if (role === "client") {
        response = await getClientProfile();

        setCompleted(response.data !== null);
      }

      if (role === "worker") {
        response = await getMyWorkerProfile();

        setCompleted(response.data !== null);
      }
    } catch (error) {
      console.log(error);

      setCompleted(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking profile...
      </div>
    );
  }

  if (!completed) {
    if (role === "client") {
      return <Navigate to="/client/profile" replace />;
    }

    if (role === "worker") {
      return <Navigate to="/worker/create-profile" replace />;
    }
  }

  return children;
};

export default ProfileCompleteRoute;
 