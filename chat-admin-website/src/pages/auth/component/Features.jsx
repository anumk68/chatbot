import React from "react";
import f1 from "../../../assets/f1.png";
import f2 from "../../../assets/f2.png";
import f3 from "../../../assets/f3.png";
import f4 from "../../../assets/f1.png";
import f5 from "../../../assets/f2.png";
import f6 from "../../../assets/f3.png";

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 feature-bg">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <span className="w-[206px] inline-block mb-4 rounded-full bg-[#0082FF] px-4 py-2 text-[16px] h-[42px] font-semibold text-white">
          Best SaaS Features
        </span>

        <h2 className="text-[34px] md:text-[48px] leading-[55px] font-bold text-[#1B2937]">
          Intelligent Features. Real Results.
        </h2>

        <p className="mt-5 max-w-[654px] mx-auto text-[#4E555A] text-[17px] leading-[26px]">
         Smart tools that automate tasks, reveal insights, and boost business outcomes — effortlessly and efficiently.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={f1} title="AI-Powered Automation" desc="Eliminate repetitive tasks with smart automation that adapts to your workflow and scales with business." />
          <FeatureCard icon={f2} title="Intuitive User Interface" desc="Enjoy a clean, modern dashboard designed for speed, clarity, effortless navigation — no training." />
          <FeatureCard icon={f3} title="Seamless Integrations" desc="Connect with your favorite tools like Slack, Zapier, HubSpot, and more to keep your ecosystem in sync." />
          <FeatureCard icon={f4} title="Real-Time Analytics" desc="Track performance and gain insights to make smarter decisions without writing a single line of code." />
          <FeatureCard icon={f5} title="Multi-Platform Access" desc="Access your data anytime, anywhere — fully optimized for web, tablet, and mobile to grow with business." />
          <FeatureCard icon={f6} title="Drag-and-Drop Builder" desc="Easily create stunning, responsive layouts by dragging and dropping elements — no coding required." />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="group rounded-2xl bg-white p-8 shadow-2xl text-left transition-all duration-500 
      hover:shadow-xl hover:bg-gray-50">
      
      {/* Icon with rotation on hover */}
      <div className="mb-6 flex h-[85px] w-[85px] items-center justify-center rounded-2xl 
        bg-gradient-to-tr from-[#7ABAF9] to-[#EDF6FF] transition-all duration-500 
        group-hover:from-[#0082FF] group-hover:to-[#0082FF]/30">
        <img src={icon} alt="" className="h-12 w-12 object-contain transition-transform duration-500 
          group-hover:rotate-[360deg]" />
      </div>

      {/* Title with color change */}
      <h3 className="text-[22px] font-semibold text-[#1B2937] leading-[22px] transition-colors duration-500 
        group-hover:text-[#0082FF]">
        {title}
      </h3>

      {/* Description with subtle color change */}
      <p className="mt-3 text-[16px] text-gray-600 leading-[26px] transition-colors duration-500 
        group-hover:text-gray-800">
        {desc}
      </p>
    </div>
  );
};


export default FeaturesSection;
