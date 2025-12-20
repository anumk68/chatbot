import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; 
import dashboard from "../../../assets/dashboard-main.png";
import arrow from "../../../assets/arrowrightblack.png";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_NODE_BASE_URL + "/api";

 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("[HeroSection] Submitting email:", email); // ✅ debug

  if (!email) {
    toast.error("Please enter your email");
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    toast.error("Please enter a valid email");
    return;
  }

try {
  setLoading(true);
  const response = await axios.post(`${API}/send`, { email });
  console.log(response.data);  // should log { message: ... }
  toast.success(response.data.message);
} catch (err) {
  console.error("[HeroSection] Axios error:", err);
  toast.error(err.response?.data?.message || "Server error");
} finally {
  setLoading(false);
}
};


  return (
    <section className="relative overflow-hidden hero-bg mb-30">
      {/* Toaster Component */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Background Blur */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-blue-100 blur-3xl opacity-40 pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 text-center">
        <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-[#1B2937]">
          Run Your Business on Autopilot
        </span>

        <h1 className="mt-6 text-[28px] sm:text-[60px] lg:text-[85px] font-bold leading-tight text-[#1B2937]">
          Next-Gen Tools for <br /> High-Performing Teams
        </h1>

        <p className="mx-auto mt-4 max-w-[699px] text-[16px] sm:text-[18px] lg:text-[22px] text-[#696969]">
          All-in-one SaaS solution designed to simplify your daily operations.
          Whether you’re managing projects or collaborating with teams.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-xs rounded-full border border-gray-300 px-5 py-3 text-sm 
              placeholder-gray-400 text-gray-900
              focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500
              transition-all duration-200
              shadow-sm hover:shadow-md"
          />

          <button
            type="submit"
            disabled={loading} // ✅ disable while loading
            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 cursor-pointer
              text-[16px] font-medium text-white hover:bg-blue-700 transition-all duration-200
              shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Request a Demo"} {/* ✅ dynamic text */}
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
              <img src={arrow} alt="arrow" className="h-3 w-3" />
            </span>
          </button>
        </form>

        {/* Dashboard */}
        <div className="relative mt-16 flex justify-center">
          <div className="rounded-xl border border-blue-200 bg-white p-3 shadow-xl">
            <img
              src={dashboard}
              alt="Dashboard Preview"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
