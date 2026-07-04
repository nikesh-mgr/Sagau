import logo from "../assets/logo.png";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative">
        {/* Rotating Ring */}
        <div className="h-28 w-28 rounded-full border-[6px] border-gray-200 border-t-green-500 animate-spin"></div>

        {/* Logo */}
        <img
          src={logo}
          alt="Sagau"
          className="absolute inset-0 m-auto h-12 w-12"
        />
      </div>
    </div>
  );
};

export default Loader;
