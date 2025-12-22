import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaArrowUp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../../assets/digi-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200">
      <div className="max-w-8xl mx-auto px-30 sm:px-6 lg:px-16">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-16 py-10 md:py-20">
          
          {/* Brand Section */}
          <div className="flex-1 max-w-md">
            <img src={logo} alt="Digi SaaS Logo" className="w-40 mb-5" />

            <p className="text-gray-600 text-[17px] leading-relaxed max-w-sm">
              SaaS platform built to simplify workflows, automate everyday tasks,
              and help teams grow faster.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6 text-gray-500 mb-10 md:mb-0">
              <FaFacebookF className="hover:text-black cursor-pointer transition" />
              <FaTwitter className="hover:text-black cursor-pointer transition" />
              <FaLinkedinIn className="hover:text-black cursor-pointer transition" />
              <FaYoutube className="hover:text-black cursor-pointer transition" />
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

            {/* Product Column */}
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-5 tracking-wide">
                Product
              </h4>
              <ul className="space-y-3">
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Features</li>
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Integrations</li>
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Download</li>
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Pricing</li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-5 tracking-wide">
                Company
              </h4>
              <ul className="space-y-3">
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">About Us</li>
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Blog</li>
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Clients</li>
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Careers</li>
              </ul>
            </div>

            {/* Features Column */}
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-5 tracking-wide">
                Features
              </h4>
              <ul className="space-y-3">
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Analytics</li>
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Integrations</li>
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Workflows</li>
                <li className="text-[17px] text-gray-500 hover:text-gray-900 cursor-pointer transition">Dashboards</li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-[20px] font-semibold text-gray-900 mb-5 tracking-wide">
                Contact
              </h4>
              <ul className="space-y-3 text-gray-500 text-[17px]">
                <li className="flex items-center gap-2 hover:text-gray-900 cursor-pointer transition">
                  <FaEnvelope /> info@digichat.com
                </li>
                <li className="flex items-center gap-2 hover:text-gray-900 cursor-pointer transition">
                  <FaPhoneAlt /> 099159 54999
                </li>
                <li className="flex items-center gap-2 hover:text-gray-900 cursor-pointer transition">
                  <FaMapMarkerAlt /> Phase 8B, Industrial Area, Sector 74
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-black">
            © 2026 DigiChat. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 bg-black text-white text-sm px-5 py-2.5 rounded-full hover:bg-gray-800 transition shadow-sm"
          >
            Back to top <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
