import React from "react";
import logo from "../../assets/digi-logo.png";
import arrowright from "../../assets/arrowright.png";
import arrowrightblack from "../../assets/arrowrightblack.png";


const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="DigiChat Logo" className="w-40" />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavItem label="Home" />
            <NavItem label="Pages" dropdown />
            <NavItem label="Blog" dropdown />
            <NavItem label="Portfolio" dropdown />
            <NavItem label="Solutions" />
            <NavItem label="Pricing" />
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 transition">
              Log In
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <img src={arrowright} alt="arrow" className="h-3 w-3" />
              </span>
            </button>

            <button className="flex items-center gap-2 border px-4 py-2 rounded-full bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition">
              Sign Up
               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                <img src={arrowrightblack} alt="arrow" className="h-3 w-3 text-black" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ label, dropdown }) => {
  return (
    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
      {label}
      {dropdown && (
        <svg
        className="h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
            />
        </svg>
      )}
    </button>
  );
};


export default Navbar;
