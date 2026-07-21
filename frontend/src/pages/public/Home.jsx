import { Link } from "react-router-dom";

import { FiSearch, FiUsers, FiShield } from "react-icons/fi";

const Home = () => {
  return (
    <div>
      <section
        className="
bg-gradient-to-br
from-emerald-50
to-white
py-24
"
      >
        <div
          className="
max-w-7xl
mx-auto
px-6
grid
md:grid-cols-2
gap-12
items-center
"
        >
          <div>
            <h1
              className="
text-5xl
font-bold
leading-tight
"
            >
              Find Skilled People. Build Great Work.
            </h1>

            <p
              className="
mt-6
text-lg
text-gray-600
"
            >
              Sagau connects clients with verified freelancers and local skilled
              workers.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/auth/register"
                className="
bg-primary
text-white
px-6
py-3
rounded-xl
"
              >
                Get Started
              </Link>

              <Link
                to="/auth/login"
                className="
border
px-6
py-3
rounded-xl
"
              >
                Login
              </Link>
            </div>
          </div>

          <div
            className="
bg-white
rounded-3xl
shadow-card
p-10
"
          >
            <div className="space-y-6">
              <div className="flex gap-4">
                <FiSearch className="text-primary text-3xl" />

                <div>
                  <h3 className="font-bold">Find Workers</h3>

                  <p className="text-gray-500">
                    Discover skilled professionals
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FiUsers className="text-primary text-3xl" />

                <div>
                  <h3 className="font-bold">Trusted Community</h3>

                  <p className="text-gray-500">
                    Build reputation through reviews
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FiShield className="text-primary text-3xl" />

                <div>
                  <h3 className="font-bold">Secure Workflow</h3>

                  <p className="text-gray-500">Agreement based hiring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
