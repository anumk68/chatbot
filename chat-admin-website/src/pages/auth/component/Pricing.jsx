import React, { useState } from "react";
import cc from "../../../assets/cc.png";
import icon from "../../../assets/icon1.png";
import arrowRight from "../../../assets/arrowright.png";

const PricingSection = () => {
  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      title: "Basic Package",
      priceMonthly: 9,
      priceYearly: 277,
      description:
        "Perfect for individuals, freelancers, and small teams starting out.",
      users: "Maximum 1 User",
      buttonText: "Start 14 Days Free Trial",
      features: [
        "Basic Dashboard Access",
        "Limited Integrations",
        "Community Support",
        "Simple Collaboration",
      ],
    },
    {
      title: "Professional Package",
      priceMonthly: 9,
      priceYearly: 452,
      description:
        "Best for growing businesses that need more power and flexibility.",
      users: "Maximum 3 Users",
      buttonText: "Start 14 Days Free Trial",
      popular: true,
      features: [
        "Advanced Dashboard Access",
        "All Integrations",
        "Priority Support",
        "Team Collaboration",
      ],
    },
    {
      title: "Enterprise Package",
      priceMonthly: 9,
      priceYearly: 904,
      description:
        "Tailored for large teams and complex needs for SaaS services.",
      users: "Maximum 7 Users",
      buttonText: "Get Started This Package",
      features: [
        "Full Dashboard Access",
        "Unlimited Integrations",
        "Dedicated Support",
        "Advanced Collaboration",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full bg-gradient-to-b from-blue-50 to-white py-20"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-4 py-1 rounded-full mb-4">
          Choose a plan
        </span>

        <h2 className="text-4xl font-bold mb-4">
          Flexible Pricing for Every Stage
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Whether you’re just getting started or scaling fast, we’ve got a
          pricing plan that fits your needs.
        </p>

        <div className="flex items-center justify-center gap-3 mb-14">
          <span
            className={`text-sm ${
              billing === "monthly" ? "font-semibold" : "text-gray-600"
            }`}
          >
            Monthly
          </span>

          <button
            onClick={() =>
              setBilling(billing === "monthly" ? "yearly" : "monthly")
            }
            className="relative w-14 h-7 bg-blue-600 rounded-full"
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                billing === "yearly" ? "translate-x-7" : ""
              }`}
            />
          </button>

          <span
            className={`text-sm ${
              billing === "yearly" ? "font-semibold" : "text-gray-500"
            }`}
          >
            Yearly
          </span>

          <span className="ml-2 bg-blue-100 text-blue-600 text-[14px] px-2 py-1 rounded-full">
            Save 20%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} billing={billing} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({
  title,
  description,
  priceMonthly,
  priceYearly,
  users,
  buttonText,
  features,
  popular,
  billing,
}) => {
  return (
    <div
      className={`relative rounded-2xl border p-8 text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        popular
          ? "bg-gradient-to-b from-[#DAEDFF] to-white border-blue-600 shadow-lg scale-[1.02]"
          : "bg-gradient-to-b from-[#EEF7FF] to-white border-gray-200"
      }`}
    >
      {popular && (
        <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          Popular
        </span>
      )}

      <div className="mb-6 flex h-[66px] w-[66px] items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7ABAF9] to-[#EDF6FF]">
        <img src={icon} alt="Plan Icon" className="w-8" />
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{description}</p>

      <div className="mb-4">
        <span className="text-4xl font-bold">
          ${billing === "monthly" ? priceMonthly : priceYearly}
        </span>
        <span className="text-gray-500 text-sm"> /month</span>
      </div>

      <button
        className={`group flex w-full items-center justify-center gap-3 border px-4 py-3 rounded-full text-sm font-medium transition-all mb-3
    ${
      popular
        ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
        : "text-gray-700 border-gray-300 hover:text-blue-600 hover:border-blue-600"
    }
  `}
      >
        {buttonText}

        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1
      ${popular ? "bg-white" : "bg-blue-500"}
    `}
        >
          <img
            src={arrowRight}
            alt="Arrow"
            className={`h-3 w-3 ${popular ? "invert" : ""}`}
          />
        </span>
      </button>

      <p className="flex items-center gap-2 mb-25 text-sm text-gray-700">
        <img src={cc} alt="Credit Card" className="w-6" />
        No credit card required
      </p>

      <ul className="space-y-3 text-[16px] text-gray-600">
        <li >✔ {users}</li>
        {features.map((feature, index) => (
          <li key={index}>✔ {feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default PricingSection;
