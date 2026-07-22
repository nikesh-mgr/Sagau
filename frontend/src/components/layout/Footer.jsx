import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xl font-bold shadow-lg">
                S
              </div>

              <div>
                <h2 className="text-2xl font-extrabold">Sagau</h2>

                <p className="text-xs text-slate-400">
                  Skilled Worker Marketplace
                </p>
              </div>
            </div>

            <p className="mt-6 leading-7 text-slate-400">
              Connecting clients with trusted freelancers and skilled workers
              across Nepal through a modern, secure, and reliable marketplace.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600"
              >
                <FiFacebook size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:bg-sky-500"
              >
                <FiTwitter size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600"
              >
                <FiInstagram size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Marketplace */}

          <div>
            <h3 className="text-lg font-bold">Marketplace</h3>

            <ul className="mt-6 space-y-4 text-slate-400">
              <li>
                <Link to="/workers" className="transition hover:text-white">
                  Find Workers
                </Link>
              </li>

              <li>
                <Link to="/jobs" className="transition hover:text-white">
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/how-it-works"
                  className="transition hover:text-white"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <Link to="/services" className="transition hover:text-white">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="text-lg font-bold">Company</h3>

            <ul className="mt-6 space-y-4 text-slate-400">
              <li>
                <Link to="/about" className="transition hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="transition hover:text-white">
                  Contact
                </Link>
              </li>

              <li>
                <Link to="/privacy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/terms" className="transition hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-lg font-bold">Contact</h3>

            <div className="mt-6 space-y-5 text-slate-400">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-blue-400" />

                <span>Kathmandu, Nepal</span>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="mt-1 text-blue-400" />

                <span>+977 98XXXXXXXX</span>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="mt-1 text-blue-400" />

                <span>support@sagau.com</span>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
              <h4 className="font-semibold">Ready to get started?</h4>

              <p className="mt-2 text-sm text-slate-300">
                Join thousands of clients and workers building successful
                projects together.
              </p>

              <Link
                to="/auth/register"
                className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Sagau. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/privacy" className="transition hover:text-white">
              Privacy
            </Link>

            <Link to="/terms" className="transition hover:text-white">
              Terms
            </Link>

            <Link to="/cookies" className="transition hover:text-white">
              Cookies
            </Link>

            <Link to="/support" className="transition hover:text-white">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
