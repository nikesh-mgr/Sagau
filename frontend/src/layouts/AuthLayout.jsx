const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-blue-600 text-white p-12">
        <div>
          <h1 className="text-5xl font-bold mb-4">Sagau</h1>

          <p className="text-lg text-blue-100">
            Connect Clients and Skilled Workers
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-slate-50">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
