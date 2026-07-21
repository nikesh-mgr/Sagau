const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold">Sagau</h2>

            <p className="text-gray-400 mt-3">
              Connecting clients with trusted skilled workers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Quick Links</h3>

            <p className="text-gray-400 mt-3">Find Workers</p>

            <p className="text-gray-400">Post Jobs</p>
          </div>

          <div>
            <h3 className="font-semibold">Contact</h3>

            <p className="text-gray-400 mt-3">Nepal</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-gray-400">
          © {new Date().getFullYear()} Sagau. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
