import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-white/90 shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
            S
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Sagau</h1>

            <p className="text-xs text-gray-500 -mt-1">
              Skilled Worker Marketplace
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-5 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Buttons */}

        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/auth/login"
            className="font-semibold text-gray-700 hover:text-primary transition"
          >
            Login
          </Link>

          <Link
            to="/auth/register"
            className="flex items-center gap-2 bg-primary hover:bg-emerald-700 transition text-white px-6 py-3 rounded-xl shadow-lg"
          >
            Get Started
            <FiArrowRight />
          </Link>
        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-11 h-11 rounded-xl hover:bg-gray-100 flex items-center justify-center transition"
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="border-t bg-white">
          <div className="flex flex-col p-6 gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-medium transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <hr className="my-3" />

            <Link
              to="/auth/login"
              onClick={() => setOpen(false)}
              className="text-center py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 transition"
            >
              Login
            </Link>

            <Link
              to="/auth/register"
              onClick={() => setOpen(false)}
              className="text-center py-3 rounded-xl bg-primary hover:bg-emerald-700 text-white font-semibold transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
