import WorkerSidebar from "./WorkerSidebar";
import WorkerNavbar from "./WorkerNavbar";

const WorkerLayout = ({ children }) => {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <WorkerSidebar />

      <div className="flex-1">
        <WorkerNavbar />

        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default WorkerLayout;
