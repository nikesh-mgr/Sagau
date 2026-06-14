import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientDashboard from "../pages/client/ClientDashboard.jsx";
import WorkerDashboard from "../pages/worker/WorkerDashboard.jsx";
import Home from "../pages/public/Home.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import NotFound from "../pages/public/NotFound.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Route path="/client" element={<ClientDashboard />} />

      <Route path="/worker" element={<WorkerDashboard />} />
    </BrowserRouter>
  );
};

export default AppRoutes;
