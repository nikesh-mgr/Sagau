import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiSearch,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const features = [
  {
    icon: <FiSearch className="text-4xl text-blue-600" />,
    title: "Find Skilled Workers",
    description:
      "Search and hire verified freelancers and local professionals with confidence.",
  },
  {
    icon: <FiUsers className="text-4xl text-blue-600" />,
    title: "Trusted Community",
    description:
      "Build long-term relationships through reviews, ratings and verified profiles.",
  },
  {
    icon: <FiShield className="text-4xl text-blue-600" />,
    title: "Safe Hiring",
    description:
      "Work with agreements and transparent hiring for a secure experience.",
  },
];

const steps = [
  {
    number: "01",
    title: "Post a Job",
    description:
      "Tell us what you need and receive applications from skilled workers.",
  },
  {
    number: "02",
    title: "Choose the Best Worker",
    description: "Compare profiles, experience and reviews before hiring.",
  },
  {
    number: "03",
    title: "Complete the Work",
    description: "Finish the project, leave a review and build lasting trust.",
  },
];

const Home = () => {
  return (
    <div>
      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl"></div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Welcome to Sagau
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
              Hire Trusted
              <span className="text-blue-600"> Freelancers</span> & Skilled
              Workers.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Sagau connects clients with trusted professionals across Nepal.
              Find the right talent, manage projects, and build long-term
              working relationships.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/auth/register"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1"
              >
                Get Started
                <FiArrowRight />
              </Link>

              <Link
                to="/about"
                className="rounded-xl border border-slate-300 px-7 py-4 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-blue-50 p-6 text-center">
                <h2 className="text-4xl font-bold text-blue-600">1000+</h2>
                <p className="mt-2 text-slate-600">Workers</p>
              </div>

              <div className="rounded-2xl bg-indigo-50 p-6 text-center">
                <h2 className="text-4xl font-bold text-indigo-600">500+</h2>
                <p className="mt-2 text-slate-600">Projects</p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-6 text-center">
                <h2 className="text-4xl font-bold text-emerald-600">98%</h2>
                <p className="mt-2 text-slate-600">Satisfaction</p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-6 text-center">
                <h2 className="text-4xl font-bold text-orange-600">24/7</h2>
                <p className="mt-2 text-slate-600">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Why Choose Sagau
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Everything You Need In One Platform
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            A modern marketplace designed to connect clients and professionals
            with trust, speed and simplicity.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {feature.icon}

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              How It Works
            </span>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              Hire In Three Simple Steps
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl bg-white p-8 shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
                  {step.number}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-16 text-center text-white shadow-2xl">
          <FiBriefcase className="mx-auto text-5xl" />

          <h2 className="mt-6 text-4xl font-bold">
            Ready to Start Your Journey?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">
            Join Sagau today and connect with trusted clients and skilled
            professionals across Nepal.
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

export default Home;
