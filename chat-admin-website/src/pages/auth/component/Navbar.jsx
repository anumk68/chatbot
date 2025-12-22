import React, { useState } from "react";
import logo from "../../../assets/digi-logo.png";
import arrowright from "../../../assets/arrowright.png";
import arrowrightblack from "../../../assets/arrowrightblack.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

/* ---------- Scroll Helper ---------- */
/* ---------- Smooth Scroll Helper ---------- */
const scrollToSection = (id, closeMenu) => {
  const el = document.getElementById(id);
  if (!el) return;

  const headerOffset = 64; // height of navbar
  const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 600; // ms
  let startTime = null;

  const easeInOutQuad = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const animation = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const run = startPosition + distance * easeInOutQuad(progress);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
    else if (closeMenu) closeMenu(false); 
  };

  requestAnimationFrame(animation);
};

/* ---------- Navbar Component ---------- */
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto md:max-w-8xl px-5 md:px-20">
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
            <NavItem label="FAQ's" target="faq's" />
            <NavItem label="Contact" target="contact" />
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
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
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <img src={logo} className="w-32" alt="Logo" />
          <button onClick={() => setOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 px-6 py-6">
          <MobileNavItem label="Home" target="home" close={setOpen} />
          <MobileNavItem label="Pages" target="pages" close={setOpen} />
          <MobileNavItem label="Features" target="features" close={setOpen} />
          <MobileNavItem label="Easy Steps" target="steps" close={setOpen} />
          <MobileNavItem label="Solutions" target="solutions" close={setOpen} />
          <MobileNavItem label="Pricing" target="pricing" close={setOpen} />
          <MobileNavItem label="FAQ's" target="faq's" close={setOpen} />
          <MobileNavItem label="Contact" target="contact" close={setOpen} />
        </nav>

        <div className="px-6 pb-6 mt-auto flex flex-col gap-4">
          <AuthButtons mobile />
        </div>
      </div>
    </header>
  );
};

/* ---------- Nav Item Components ---------- */
const NavItem = ({ label, target }) => (
  <button
    onClick={() => scrollToSection(target)}
    className="text-[18px] font-medium text-gray-700 hover:text-blue-600 transition-transform duration-200 hover:scale-105 cursor-pointer"
  >
    {label}
  </button>
);

const MobileNavItem = ({ label, target, close }) => (
  <button
    onClick={() => scrollToSection(target, close)}
    className="text-left text-base font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 hover:translate-x-1"
  >
    {label}
  </button>
);

const AuthButtons = ({ mobile }) => (
  <>
    <Link
      to="/login"
      className={`group flex items-center justify-between w-max gap-2 border px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200 ${
        mobile ? "w-full" : ""
      }`}
    >
      Log In
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 transition-transform group-hover:translate-x-1">
        <img src={arrowright} className="h-3 w-3" alt="arrow" />
      </span>
    </Link>

    <Link
      to="/signup"
      className={`group flex items-center justify-between gap-2 w-max px-4 py-2 rounded-full bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-all duration-200 ${
        mobile ? "w-full" : ""
      }`}
    >
      Sign Up
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-1">
        <img src={arrowrightblack} className="h-3 w-3" alt="arrow" />
      </span>
    </Link>
  </>
);

export default Navbar;
