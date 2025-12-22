import React from "react";
import arrowright from "../../../assets/arrowright.png";

const Freetrial = () => {
  return (
    <section className=" feature-bg w-full bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-flex items-center justify-center mb-6 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
         Launch with ease
        </span>

        <h2 className="text-4xl md:text-[48px] font-bold text-gray-900 mb-6 leading-[55px">
          Launch Your Free Trial Today
        </h2>

        <p className="text-gray-600 text-base md:text-[18px] leading-[26px] max-w-[538px] mx-auto mb-5 px-4">
          Experience the full power of our platform—free for 14 days. No <br /> credit
          card required, no strings attached.
        </p>

        <div className="flex justify-center">
          <button className="group flex cursor-pointer items-center gap-3 rounded-full border border-blue-600 bg-blue-600 px-6 md:px-10 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700">
            Start 14 Days Free Trial
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:translate-x-1">
              <img src={arrowright} alt="Arrow" className="h-3 w-3 invert" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Freetrial;
