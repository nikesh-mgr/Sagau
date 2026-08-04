import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import About from "../pages/public/About";
import ClientLayout from "../layouts/ClientLayout";
import WorkerLayout from "../layouts/WorkerLayout";
import AdminLayout from "../layouts/AdminLayout";
import ClientProfile from "../pages/client/ClientProfile";
import ClientDashboard from "../pages/client/ClientDashboard";
import WorkerDashboard from "../pages/worker/WorkerDashboard";
import WorkerDetails from "../pages/admin/WorkerDetails";
import AdminMessages from "../pages/admin/AdminMessages";
import AuthLayout from "../layouts/AuthLayout";
import Contact from "../pages/public/Contact";
import CreateWorkerProfile from "../pages/worker/CreateWorkerProfile";
import PublicLayout from "../layouts/PublicLayout";
import CreateJob from "../pages/client/CreateJob";
import HowItWorks from "../pages/public/Howitworks";
import MyJobs from "../pages/client/MyJobs";
import EditJob from "../pages/client/EditJob";
import Services from "../pages/public/Services";
import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import JobDetails from "../pages/client/JobDetails";
import BrowseJobs from "../pages/worker/BrowseJob";
import WorkerJobDetails from "../pages/worker/WorkerJobDetails";
import ApplyJob from "../pages/worker/ApplyJob";
import MyApplications from "../pages/worker/MyApplications";
import ClientApplication from "../pages/client/Applications";
import JobApplicants from "../pages/client/JobApplicants";
import ClientAgreements from "../pages/client/Agreements";
import WorkerAgreements from "../pages/worker/Agreements";
import AgreementDetails from "../pages/client/AgreementDetails";
import WorkerAgreementDetails from "../pages/worker/AgreementDetails";
import WorkerReviews from "../pages/worker/Reviews";
import ProfileCompleteRoute from "./ProfileCompleteRoute";
import WorkerProfile from "../pages/worker/Profile";
import ClientReviews from "../pages/client/MyReviews";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUser";
import AdminWorkers from "../pages/admin/AdminWorkers";
import AdminClients from "../pages/admin/AdminClients";
import ClientDetails from "../pages/admin/ClientDetails";
import AdminJobs from "../pages/admin/AdminJobs";

import AdminAgreements from "../pages/admin/AdminAgreements";
import AdminJobDetails from "../pages/admin/AdminJobDetails";
import AdminAgreementDetails from "../pages/admin/AdminAgreementDetails";

const router = createBrowserRouter([
  {
    path: "/",

    element: <PublicLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/auth",

    element: <AuthLayout />,

    children: [
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",

    element: <ProtectedRoute />,

    children: [
      {
        path: "client",

        element: <RoleRoute role="client" />,

        children: [
          {
            element: <ClientLayout />,

            children: [
              {
                path: "dashboard",

                element: (
                  <ProfileCompleteRoute role="client">
                    <ClientDashboard />
                  </ProfileCompleteRoute>
                ),
              },
              {
                path: "profile",
                element: <ClientProfile />,
              },
              {
                path: "jobs",
                element: <MyJobs />,
              },

              {
                path: "jobs/create",
                element: <CreateJob />,
              },
              {
                path: "jobs/:id",
                element: <JobDetails />,
              },
              {
                path: "jobs/edit/:id",
                element: <EditJob />,
              },
              {
                path: "jobs/:jobId/applicants",
                element: <JobApplicants />,
              },
              {
                path: "applications",
                element: <ClientApplication />,
              },
              {
                path: "agreements",
                element: <ClientAgreements />,
              },
              {
                path: "agreements/:agreementId",
                element: <AgreementDetails />,
              },
              {
                path: "reviews",
                element: <ClientReviews />,
              },
            ],
          },
        ],
      },

      {
        path: "worker",

        element: <RoleRoute role="worker" />,

        children: [
          {
            element: <WorkerLayout />,

            children: [
              {
                path: "dashboard",

                element: (
                  <ProfileCompleteRoute role="worker">
                    <WorkerDashboard />
                  </ProfileCompleteRoute>
                ),
              },
              {
                path: "jobs",
                element: <BrowseJobs />,
              },
              {
                path: "jobs/:id",
                element: <WorkerJobDetails />,
              },
              {
                path: "jobs/:jobId/apply",
                element: <ApplyJob />,
              },
              {
                path: "applications",
                element: <MyApplications />,
              },
              {
                path: "agreements",
                element: <WorkerAgreements />,
              },
              {
                path: "agreements/:agreementId",
                element: <WorkerAgreementDetails />,
              },
              {
                path: "reviews",
                element: <WorkerReviews />,
              },
              {
                path: "profile",
                element: <WorkerProfile />,
              },
              {
                path: "create-profile",
                element: <CreateWorkerProfile />,
              },
            ],
          },
        ],
      },
      {
        path: "admin",

        element: <RoleRoute role="admin" />,

        children: [
          {
            element: <AdminLayout />,

            children: [
              {
                index: true,
                element: <AdminDashboard />,
              },

              {
                path: "dashboard",
                element: <AdminDashboard />,
              },

              {
                path: "users",
                element: <AdminUsers />,
              },

              {
                path: "workers",
                element: <AdminWorkers />,
              },
              {
                path: "workers/:workerId",
                element: <WorkerDetails />,
              },

              {
                path: "clients",
                element: <AdminClients />,
              },
              {
                path: "clients/:clientId",
                element: <ClientDetails />,
              },
              {
                path: "jobs",
                element: <AdminJobs />,
              },

              // {
              //   path: "applications",
              //   element: <AdminApplications />,
              // },

              {
                path: "agreements",
                element: <AdminAgreements />,
              },
              {
                path: "messages",
                element: <AdminMessages />,
              },
              {
                path: "jobs/:jobId",
                element: <AdminJobDetails />,
              },
              {
                path: "agreements/:agreementId",
                element: <AdminAgreementDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
