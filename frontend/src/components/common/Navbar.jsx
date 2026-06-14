import useAuthStore from "../../store/authStore";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="font-semibold">Welcome, {user?.fullName}</h2>

      <div className="text-sm text-slate-500">{user?.role}</div>
    </header>
  );
};

export default Navbar;
