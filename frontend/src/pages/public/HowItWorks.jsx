import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClipboard,
  FiSearch,
  FiUser,
} from "react-icons/fi";

const clientSteps = [
  {
    icon: <FiClipboard className="text-4xl text-blue-600" />,
    title: "Post Your Job",
    description:
      "Describe your project, budget, and requirements to attract the right professionals.",
  },
  {
    icon: <FiSearch className="text-4xl text-blue-600" />,
    title: "Review Applications",
    description:
      "Compare worker profiles, skills, experience, and ratings before making a decision.",
  },
  {
    icon: <FiCheckCircle className="text-4xl text-blue-600" />,
    title: "Hire & Complete",
    description:
      "Select the best worker, complete the project, and leave a review to build trust.",
  },
];

const workerSteps = [
  {
    icon: <FiUser className="text-4xl text-emerald-600" />,
    title: "Create Your Profile",
    description:
      "Showcase your skills, experience, portfolio, and services to attract clients.",
  },
  {
    icon: <FiBriefcase className="text-4xl text-emerald-600" />,
    title: "Apply for Jobs",
    description:
      "Browse available opportunities and send applications to projects that match your expertise.",
  },
  {
    icon: <FiCheckCircle className="text-4xl text-emerald-600" />,
    title: "Grow Your Reputation",
    description:
      "Deliver quality work, receive reviews, and increase your chances of getting hired again.",
  },
];

const HowItWorks = () => {
  return (
    <div>
      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            How Sagau Works
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-slate-900">
            Connecting Clients &
            <span className="text-blue-600"> Skilled Workers</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Sagau makes hiring and finding work simple. Whether you're looking
            for trusted professionals or searching for your next opportunity,
            getting started only takes a few steps.
          </p>
        </div>
      </section>

      {/* Client Journey */}

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              For Clients
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Hire in 3 Easy Steps
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {clientSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-700">
                  {index + 1}
                </div>

                <div className="mt-6">{step.icon}</div>

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

      {/* Worker Journey */}

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              For Workers
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Build Your Career
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {workerSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-lg font-bold text-emerald-700">
                  {index + 1}
                </div>

                <div className="mt-6">{step.icon}</div>

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
          <h2 className="text-4xl font-bold">Start Your Journey Today</h2>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">
            Join Sagau and connect with trusted clients or skilled
            professionals. Your next opportunity is just a few clicks away.
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

export default HowItWorks;
