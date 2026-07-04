import ClientNavbar from "./ClientNavbar";
import ClientSidebar from "./ClientSidebar";

const ClientLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <ClientSidebar />

      <div className="flex-1 flex flex-col">
        <ClientNavbar />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
