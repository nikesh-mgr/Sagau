import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiClipboard,
  FiSearch,
  FiShield,
  FiStar,
  FiUsers,
} from "react-icons/fi";

const services = [
  {
    icon: <FiSearch className="text-5xl text-blue-600" />,
    title: "Find Skilled Workers",
    description:
      "Browse verified freelancers and skilled professionals for any type of work.",
  },
  {
    icon: <FiBriefcase className="text-5xl text-blue-600" />,
    title: "Post Jobs",
    description:
      "Create job listings and receive applications from qualified workers.",
  },
  {
    icon: <FiClipboard className="text-5xl text-blue-600" />,
    title: "Project Agreements",
    description:
      "Manage work using transparent agreements for better accountability.",
  },
  {
    icon: <FiStar className="text-5xl text-blue-600" />,
    title: "Ratings & Reviews",
    description:
      "Build trust through verified ratings and reviews after every completed job.",
  },
  {
    icon: <FiShield className="text-5xl text-blue-600" />,
    title: "Secure Marketplace",
    description:
      "A trusted platform with verified users and transparent hiring workflows.",
  },
  {
    icon: <FiUsers className="text-5xl text-blue-600" />,
    title: "Grow Your Career",
    description:
      "Showcase your skills, build your reputation, and discover new opportunities.",
  },
];

const Services = () => {
  return (
    <div>
      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Our Services
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-slate-900">
            Everything You Need
            <span className="text-blue-600"> In One Marketplace</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Sagau provides a complete platform where clients and skilled
            professionals can connect, collaborate, and build trusted working
            relationships.
          </p>
        </div>
      </section>

      {/* Services */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl"
              >
                {service.icon}

                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                  {service.title}
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Why Choose Sagau
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Built for Clients & Workers
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-slate-600">
              We simplify hiring by bringing everything together in one secure,
              easy-to-use platform.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-4xl font-bold text-blue-600">1000+</h3>

              <p className="mt-3 text-slate-600">
                Verified workers ready to help.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-4xl font-bold text-blue-600">500+</h3>

              <p className="mt-3 text-slate-600">
                Projects successfully completed.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h3 className="text-4xl font-bold text-blue-600">98%</h3>

              <p className="mt-3 text-slate-600">
                Client satisfaction and trusted hiring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold">Ready to Start?</h2>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">
            Join thousands of clients and skilled workers using Sagau to build
            successful projects every day.
          </p>

          <Link
            to="/auth/register"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:-translate-y-1"
          >
            Create Free Account
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
