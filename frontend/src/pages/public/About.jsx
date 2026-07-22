import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiGlobe,
  FiHeart,
  FiUsers,
} from "react-icons/fi";

const values = [
  {
    icon: <FiUsers className="text-4xl text-blue-600" />,
    title: "Community First",
    description:
      "We connect skilled professionals with clients to build meaningful and long-lasting working relationships.",
  },
  {
    icon: <FiAward className="text-4xl text-blue-600" />,
    title: "Quality & Trust",
    description:
      "Verified workers, transparent hiring, and reputation-based profiles create a trustworthy marketplace.",
  },
  {
    icon: <FiHeart className="text-4xl text-blue-600" />,
    title: "Empowering People",
    description:
      "Our goal is to create opportunities for freelancers and local skilled workers across Nepal.",
  },
];

const About = () => {
  return (
    <div>
      {/* Hero */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            About Sagau
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-slate-900">
            Connecting Talent with
            <span className="text-blue-600"> Opportunity.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Sagau is a modern marketplace that helps clients hire trusted
            freelancers and skilled workers while creating more opportunities
            for professionals to grow their careers.
          </p>
        </div>
      </section>

      {/* Story */}

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Our Story
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Building a Better Marketplace for Everyone
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Finding reliable workers and trustworthy clients shouldn't be
              difficult. Sagau was created to bridge that gap by providing one
              platform where both sides can connect with confidence.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Whether you're hiring for a small task or looking for your next
              freelance opportunity, Sagau helps make the process simple,
              transparent, and secure.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-3xl bg-blue-50 p-8 text-center">
              <h2 className="text-4xl font-bold text-blue-600">1000+</h2>
              <p className="mt-3 text-slate-600">Verified Workers</p>
            </div>

            <div className="rounded-3xl bg-indigo-50 p-8 text-center">
              <h2 className="text-4xl font-bold text-indigo-600">500+</h2>
              <p className="mt-3 text-slate-600">Projects Posted</p>
            </div>

            <div className="rounded-3xl bg-emerald-50 p-8 text-center">
              <h2 className="text-4xl font-bold text-emerald-600">98%</h2>
              <p className="mt-3 text-slate-600">Happy Clients</p>
            </div>

            <div className="rounded-3xl bg-orange-50 p-8 text-center">
              <h2 className="text-4xl font-bold text-orange-600">24/7</h2>
              <p className="mt-3 text-slate-600">Platform Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Our Values
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              What Makes Sagau Different
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {value.icon}

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}

      <section className="py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="flex items-center gap-4">
            <FiGlobe className="text-5xl text-blue-600" />

            <div>
              <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>

              <p className="mt-2 text-slate-600">
                To become Nepal's most trusted platform for connecting skilled
                professionals and clients.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="flex gap-3">
              <FiCheckCircle className="mt-1 text-blue-600" />
              <p className="text-slate-600">
                Build trust through verified profiles.
              </p>
            </div>

            <div className="flex gap-3">
              <FiCheckCircle className="mt-1 text-blue-600" />
              <p className="text-slate-600">Support local skilled workers.</p>
            </div>

            <div className="flex gap-3">
              <FiCheckCircle className="mt-1 text-blue-600" />
              <p className="text-slate-600">Make hiring faster and easier.</p>
            </div>

            <div className="flex gap-3">
              <FiCheckCircle className="mt-1 text-blue-600" />
              <p className="text-slate-600">
                Create opportunities for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold">Join the Sagau Community</h2>

          <p className="mx-auto mt-5 max-w-2xl text-blue-100">
            Whether you're looking to hire trusted professionals or find your
            next opportunity, Sagau is here to help you succeed.
          </p>

          <Link
            to="/auth/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:-translate-y-1"
          >
            Get Started
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
