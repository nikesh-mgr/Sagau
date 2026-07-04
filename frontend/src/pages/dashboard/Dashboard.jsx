import useAuthStore from "../../store/authStore";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome {user?.fullName}</h1>

      <p>Role: {user?.role}</p>
    </div>
  );
};

export default Dashboard;
