import React from "react";
import { FaArrowRight, FaQuestionCircle } from "react-icons/fa";
import Accordion from "./Accordion";

const FAQSection = () => {
  return (
    <section id="faq's" className="w-full bg-gradient-to-b from-blue-50 to-white py-20">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 items-start">
          {/* LEFT */}
          <div className="md:pr-10">
            <Accordion />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start md:sticky md:top-5">
            <span className="mb-6 flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
              <FaQuestionCircle size={14} />
              FAQs
            </span>

            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Frequently Asked <br className="hidden sm:block" /> Questions
            </h2>

            <p className="text-slate-600 max-w-lg mb-10">
              We know choosing the right software can raise a lot of questions.
              That’s why we’ve put together answers to the most common ones.
            </p>

            <button className=" cursor-pointer group inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-3 text-[17px] font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              Get a Quote
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 transition-transform group-hover:translate-x-1">
                <FaArrowRight size={12} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
