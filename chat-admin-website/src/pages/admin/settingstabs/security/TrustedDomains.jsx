import React, { useState } from "react";

const TrustedDomains = () => {
  const [activeTab, setActiveTab] = useState("trusted");

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Title */}
      <h1 className="text-lg font-medium mb-2">Trusted domains</h1>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-6">
        Protect your LiveChat widget from being added to unauthorized sites by
        creating a list of trusted domains. Trusting a domain automatically
        trusts all its subdomains. Trusting a subdomain doesn’t trust its core
        domain.{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Learn more
        </a>
      </p>

      {/* Manage domains */}
      <h2 className="text-sm font-medium mb-4">Manage domains</h2>

      {/* Tabs */}
      <div className="flex space-x-6 border-b mb-6 text-sm">
        <button
          onClick={() => setActiveTab("trusted")}
          className={`pb-2 ${
            activeTab === "trusted"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Trusted (0)
        </button>
        <button
          onClick={() => setActiveTab("detected")}
          className={`pb-2 ${
            activeTab === "detected"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Detected (0)
        </button>
      </div>

      {/* Content switching */}
      {activeTab === "trusted" ? (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            You don’t have any trusted domains added yet. Add trusted domain
            manually or check{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Detected domains
            </a>
            .
          </p>

          {/* Input + Button */}
          <div className="flex space-x-2 w-full max-w-md">
            <input
              type="text"
              placeholder="yourdomain.com"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">
              Add to trusted
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-500">
            We didn’t detect any websites with LiveChat code installed.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Install LiveChat code
            </a>{" "}
            on your website.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrustedDomains;
