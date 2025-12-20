import React from "react";
import finance from "../../../assets/finance.png";
import arrowRight from "../../../assets/arrowrightblack.png"; // Import arrow image

const FinanceSection = () => {
  return (
    <div id="solutions" className="flex flex-col md:flex-row items-center justify-between bg-white p-10 rounded-xl shadow-lg gap-10">
      
      <div className="flex-1">
        <img src={finance} className="w-full" alt="Finance overview chart" />
      </div>

      <div className="w-full md:w-[550px]">
        <span className="text-[16px] leading-[16px] text-black bg-[#BADDFF]  px-4 py-2 rounded-full mb-2 inline-block">
          Simplify Workflow
        </span>
        <h1 className="text-[48px] leading-[55px] font-bold mb-4">
          All-in-One Solution to Simplify Your Workflow
        </h1>
        <p className="text-[16px] leading-[22px] tracking-normal text-[#69697D] mb-6">
          Seamlessly connect your workflow with the industry’s leading tools. Whether it’s CRM platforms, communication apps, or analytics software, our system is designed to integrate effortlessly—so you can work smarter, not harder.
        </p>
        <button className="flex items-center gap-2 border px-4 py-2 rounded-full bg-blue-600 text-sm font-medium text-white text-[16px] hover:bg-blue-700 transition">
         Get Started
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
            <img alt="arrow" className="h-3 w-3 text-black" src={arrowRight} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default FinanceSection;
