import React, { useState } from "react";
import { FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
    
  {
    question: "What is included in the free plan?",
    answer:
      "The free plan gives you access to core features, basic analytics, and limited integrations to help you get started.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account dashboard without any penalties.",
  },
  {
    question: "Is my data safe with your platform?",
    answer:
      "Absolutely. We use enterprise-grade encryption and follow industry best practices to keep your data secure.",
  },
  {
    question: "Do you offer team or enterprise plans?",
    answer:
      "Yes, we offer flexible team and enterprise plans tailored to your organization’s needs.",
  }
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0); 

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-slate-200/50">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div key={index} className="group">
            <button
              onClick={() => toggleFAQ(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              className="
                flex w-full items-center justify-between gap-4 px-8 py-6
                text-left transition-all duration-300 ease-out
                hover:bg-white/50 hover:shadow-inner hover:scale-[1.02] cursor-pointer
                rounded-lg mx-2 my-1
              "
            >
              <span className="text-base font-semibold text-slate-900 group-hover:text-blue-700">
                {faq.question}
              </span>

              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 transition-all
                ${isOpen ? "rotate-180" : ""}`}
              >
                {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
              </span>
            </button>

            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-500 ease-in-out px-8 mx-2
              ${isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="text-sm text-slate-600 pt-2 border-l-2 border-blue-200 pl-4">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;