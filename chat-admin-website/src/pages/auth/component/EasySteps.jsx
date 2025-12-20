import React from "react";
import icon1 from '../../../assets/icon1.png';
import icon2 from '../../../assets/icon2.png';
import icon3 from '../../../assets/icon3.png';

const steps = [
  { icon: icon1, title: "Sign Up & Set Up", description: "Create your account in minutes and easily configure your settings to match your business needs—no coding." },
  { icon: icon2, title: "Connect & Automate", description: "Integrate your favorite tools, import your data, and set up automated SaaS workflows to start saving time." },
  { icon: icon3, title: "Launch & Grow", description: "Start using the platform to streamline operations, boost productivity, and scale your business with real-time." },
];

const StepsSection = () => {
  return (
    <section id="steps" className="feature-bg to-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="w-[206px] inline-block mb-4 rounded-full bg-[#0082FF] px-4 py-2 text-[16px] h-[42px] font-semibold text-white">How It Works</span>
        <h2 className="text-[48px] leading-[55px] font-bold text-gray-900 mb-10">
          Easy Steps to Get Started
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
              <div className="mb-6 flex h-[66px] w-[66px] items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7ABAF9] to-[#EDF6FF]">
                <img src={step.icon} alt={step.title} className="w-8" />
              </div>
              <h3 className="text-[22px] leading-[22px] font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
