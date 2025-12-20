import React, { useState } from "react";
import logo from "../../../assets/digi-logo.png";
import arrowright from "../../../assets/arrowright.png";
import arrowrightblack from "../../../assets/arrowrightblack.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

/* ---------- Scroll Helper ---------- */
const scrollToSection = (id, closeMenu) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    if (closeMenu) closeMenu(false);
  }
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <img src={logo} alt="DigiChat Logo" className="w-40" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <NavItem label="Home" target="home" />
            <NavItem label="Data Analytics" target="pages" />
            <NavItem label="Features" target="features" />
            <NavItem label="Easy Steps" target="steps" />
            <NavItem label="Solutions" target="solutions" />
            <NavItem label="Pricing" target="pricing" />
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <AuthButtons />
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-gray-700"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <img src={logo} className="w-32" />
          <button onClick={() => setOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 px-6 py-6 ">
          <MobileNavItem label="Home" target="home" close={setOpen} />
          <MobileNavItem label="Pages" target="pages" close={setOpen} />
          <MobileNavItem label="Features" target="features" close={setOpen} />
          <MobileNavItem label="Portfolio" target="portfolio" close={setOpen} />
          <MobileNavItem label="Solutions" target="solutions" close={setOpen} />
          <MobileNavItem label="Pricing" target="pricing" close={setOpen} />
        </nav>

        <div className="px-6 pb-6 mt-auto flex flex-col gap-4">
          <AuthButtons mobile />
        </div>
      </div>
    </header>
  );
};

/* ---------- Components ---------- */

const NavItem = ({ label, target }) => (
  <button
    onClick={() => scrollToSection(target)}
    className="text-[18px] font-medium text-gray-700 hover:text-blue-600 transition cursor-pointer hover:scale-102"
  >
    {label}
  </button>
);

const MobileNavItem = ({ label, target, close }) => (
  <button
    onClick={() => scrollToSection(target, close)}
    className="text-left text-base font-medium text-gray-700 hover:text-blue-600 transition-all hover:translate-x-1"
  >
    {label}
  </button>
);

const AuthButtons = ({ mobile }) => (
  <>
    <Link
      to="/login"
      className={`group flex items-center justify-between w-max gap-2 border px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 transition-all ${
        mobile && "w-full"
      }`}
    >
      Log In
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 transition-transform group-hover:translate-x-1">
        <img src={arrowright} className="h-3 w-3" />
      </span>
    </Link>

    <Link
      to="/signup"
      className={`group flex items-center justify-between gap-2 w-max px-4 py-2 rounded-full bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-all ${
        mobile && "w-full"
      }`}
    >
      Sign Up
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-1">
        <img src={arrowrightblack} className="h-3 w-3" />
      </span>
    </Link>
  </>
);

export default Navbar;
