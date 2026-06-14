import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="md:ml-64">
        <Navbar />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
