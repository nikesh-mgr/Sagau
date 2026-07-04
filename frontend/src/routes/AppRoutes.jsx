import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MyJobs from "../pages/client/MyJobs";
import Home from "../pages/public/Home";
import NotFound from "../pages/public/NotFound";
import MyApplications from "../pages/worker/MyApplications";
import PrivateRoute from "./PrivateRoute";
import WorkerJobDetails from "../pages/worker/WorkerJobDetails";
import BrowseJobs from "../pages/worker/BrowseJobs";
import ViewJob from "../pages/client/ViewJob";
import EditJob from "../pages/client/EditJob";
import JobApplications from "../pages/client/JobApplications";
// ---------------- CLIENT ----------------
import ClientWorkerProfile from "../pages/client/WorkerProfile";
import ClientDashboard from "../pages/client/ClientDashboard";
import CreateProfile from "../pages/client/CreateProfile";
import Profile from "../pages/client/Profile";
import EditProfile from "../pages/client/EditProfile";
import CreateJob from "../pages/client/CreateJob";

// ---------------- WORKER ----------------
import WorkerDashboard from "../pages/worker/WorkerDashboard";
import WorkerCreateProfile from "../pages/worker/CreateProfile";
import WorkerProfile from "../pages/worker/Profile";
import WorkerEditProfile from "../pages/worker/EditProfile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= CLIENT ================= */}

      <Route
        path="/client"
        element={
          <PrivateRoute>
            <ClientDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/client/workers/:workerId"
        element={
          <PrivateRoute>
            <ClientWorkerProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/client/profile/create"
        element={
          <PrivateRoute>
            <CreateProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/client/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/client/jobs"
        element={
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        }
      />

      <Route
        path="/client/jobs/:jobId"
        element={
          <PrivateRoute>
            <ViewJob />
          </PrivateRoute>
        }
      />

      <Route
        path="/client/jobs/edit/:jobId"
        element={
          <PrivateRoute>
            <EditJob />
          </PrivateRoute>
        }
      />

      <Route
        path="/client/profile/edit"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/client/jobs/create"
        element={
          <PrivateRoute>
            <CreateJob />
          </PrivateRoute>
        }
      />
      <Route
        path="/client/jobs/create"
        element={
          <PrivateRoute>
            <CreateJob />
          </PrivateRoute>
        }
      />
      <Route
        path="/client/jobs"
        element={
          <PrivateRoute>
            <MyJobs />
          </PrivateRoute>
        }
      />

      {/* ================= WORKER ================= */}

      <Route
        path="/worker"
        element={
          <PrivateRoute>
            <WorkerDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/worker/profile/create"
        element={
          <PrivateRoute>
            <WorkerCreateProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/worker/profile"
        element={
          <PrivateRoute>
            <WorkerProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/worker/profile/edit"
        element={
          <PrivateRoute>
            <WorkerEditProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/worker/jobs"
        element={
          <PrivateRoute>
            <BrowseJobs />
          </PrivateRoute>
        }
      />
      <Route
        path="/worker/applications"
        element={
          <PrivateRoute>
            <MyApplications />
          </PrivateRoute>
        }
      />
      <Route
        path="/client/jobs/:jobId/applications"
        element={
          <PrivateRoute>
            <JobApplications />
          </PrivateRoute>
        }
      />
      <Route
        path="/worker/jobs/:jobId"
        element={
          <PrivateRoute>
            <WorkerJobDetails />
          </PrivateRoute>
        }
      />
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
