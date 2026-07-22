import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiArrowRight, FiChevronRight } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "How It Works",
      path: "/how-it-works",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-slate-200/70 bg-white/80 shadow-xl backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* Logo */}

          <Link to="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xl font-extrabold text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-300/50">
              S
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                Sagau
              </h1>

              <p className="-mt-1 text-xs text-slate-500">
                Freelance & Skilled Workers
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Buttons */}

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/auth/login"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-300/50"
            >
              Get Started
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:border-blue-400 hover:text-blue-600 lg:hidden"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Menu */}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-[320px] bg-white shadow-2xl transition-all duration-500 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Menu</h2>

            <p className="text-sm text-slate-500">Navigate Sagau</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200"
          >
            <FiX size={22} />
          </button>
        </div>

        <div className="flex flex-col px-6 py-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `mb-2 flex items-center justify-between rounded-2xl px-5 py-4 text-base font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                }`
              }
            >
              {item.name}

              <FiChevronRight />
            </NavLink>
          ))}{" "}
          <div className="mt-8 space-y-3 border-t border-slate-200 pt-8">
            <Link
              to="/auth/login"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-2xl border border-slate-300 px-5 py-3.5 text-center text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              onClick={() => setOpen(false)}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-center text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-300/50"
            >
              Get Started
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-100">
              Sagau
            </p>

            <h3 className="mt-2 text-xl font-bold">
              Find skilled workers faster.
            </h3>

            <p className="mt-3 text-sm leading-6 text-blue-100">
              Hire trusted freelancers and local professionals with confidence,
              all from one modern marketplace.
            </p>

            <Link
              to="/auth/register"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition-all duration-300 hover:bg-blue-50"
            >
              Join Now
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
