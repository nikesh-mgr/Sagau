import { Link } from "react-router-dom";

import desktop404 from "../../assests/404d.png";
import mobile404 from "../../assests/404m.png";

export default function NotFound() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Desktop Image */}
      <img
        src={desktop404}
        alt="404 Not Found"
        className="hidden md:block h-full w-full object-cover"
      />

      {/* Mobile Image */}
      <img
        src={mobile404}
        alt="404 Not Found"
        className="block md:hidden h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Home Button */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <Link
          to="/"
          className="rounded-full bg-green-600 px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-green-700 hover:scale-105"
        >
          ← Return Home
        </Link>
      </div>
    </div>
  );
}
