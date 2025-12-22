import React from "react";
import finance from "../../../assets/finance.png";
import arrowRight from "../../../assets/arrowrightblack.png"; // Import arrow image

const FinanceSection = () => {
  return (
   <div
  id="solutions"
  className="flex flex-col-reverse md:flex-row items-center gap-20 rounded-xl bg-white p-6 md:p-10 shadow-lg"
>
  {/* Image */}
  <div className="flex w-full md:w-1/2 justify-center md:justify-end">
    <img
      src={finance}
      alt="Finance overview chart"
      className="w-full max-w-[500px]"
    />
  </div>

  {/* Content */}
  <div className="w-full md:w-1/2 max-w-[550px]">
    <span className="mb-3 inline-block rounded-full bg-[#BADDFF] px-4 py-2 text-sm font-medium text-black">
      Simplify Workflow
    </span>

    <h1 className="mb-4 text-3xl md:text-4xl lg:text-[48px] font-bold leading-tight">
      All-in-One Solution to Simplify Your Workflow
    </h1>

    <p className="mb-6 text-base leading-relaxed text-[#69697D]">
      Seamlessly connect your workflow with the industry’s leading tools.
      Whether it’s CRM platforms, communication apps, or analytics software,
      our system is designed to integrate effortlessly—so you can work
      smarter, not harder.
    </p>

    <button className="group flex items-center gap-3 cursor-pointer rounded-full bg-blue-600 px-5 py-3 text-base font-medium text-white transition hover:bg-blue-700">
      Get Started
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition group-hover:scale-105">
        <img src={arrowRight} alt="arrow" className="h-3 w-3" />
      </span>
    </button>
  </div>
</div>

  );
};

export default FinanceSection;
