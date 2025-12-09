import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [expandedItem, setExpandedItem] = useState("item1");
  const [userName, setUserName] = useState("");

  // Fetch user name from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.name || "User");
    }
  }, []);

  const toggleExpand = (item) => {
    setExpandedItem((prev) => (prev === item ? null : item));
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row w-3/4 h-screen p-4">
          {/* LEFT SIDE - Gray box */}
          <div className="flex-1 bg-gray-50 rounded-l-2xl p-4 flex flex-col">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-[40px] font-bold text-black-500">
                Hello {userName}!
              </h1>
              <p className="text-xl text-black">
                Let's get you started with LiveChat
              </p>
            </div>

            {/* Items list */}
            <div className="space-y-4 overflow-y-auto">
              {/* Item 1 */}
              <div className="pb-5 border-b border-gray-200 bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <div className="flex items-center justify-center w-5 h-5 bg-green-600 rounded-full">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-semibold text-gray-900 line-through">
                        Try out your chat workspace in a sample chat
                      </h3>
                      <button
                        onClick={() => toggleExpand("item1")}
                        className="text-gray-400 hover:text-gray-500 ml-2 transition-transform duration-200"
                        style={{
                          transform:
                            expandedItem === "item1"
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                    {expandedItem === "item1" && (
                      <>
                        <p className="text-sm text-gray-600 mt-2 mb-3">
                          See how conversations flow and explore tools that help
                          you respond faster and assist customers effectively.
                        </p>
                        <span className="text-[#0066FF] text-sm font-medium cursor-pointer hover:underline">
                          Go to sample chat
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="pb-5 border-b border-gray-200 bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Preview and customize your chat widget
                  </h3>
                  <button
                    onClick={() => toggleExpand("item2")}
                    className="text-gray-400 hover:text-gray-500 ml-2 transition-transform duration-200"
                    style={{
                      transform:
                        expandedItem === "item2"
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                {expandedItem === "item2" && (
                  <>
                    <p className="text-gray-600 text-sm mt-2 mb-3">
                      Match it to your brand's look and feel by customizing it
                      directly on your site. Access more options in the
                      settings.
                    </p>
                    <div className="flex justify-between">
                      <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                        Preview widget
                      </span>
                      <span className="text-gray-500">
                        digirushsolutions.com
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Item 3 */}
              <div className="pb-5 border-b border-gray-200 bg-white p-5 rounded-2xl shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Test your chatbot's knowledge
                  </h3>
                  <button
                    onClick={() => toggleExpand("item3")}
                    className="text-gray-400 hover:text-gray-500 ml-2 transition-transform duration-200"
                    style={{
                      transform:
                        expandedItem === "item3"
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
                {expandedItem === "item3" && (
                  <p className="text-gray-600 text-sm mt-2">
                    Content for testing your chatbot's knowledge would appear
                    here when expanded.
                  </p>
                )}
              </div>

              {/* You can keep the rest of your items (4–8) same as before */}
            </div>
          </div>

          {/* RIGHT SIDE - Gradient box */}
          <div className="flex-1 flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 rounded-r-2xl p-6">
            <div className="relative">
              <div className="absolute w-72 h-80 bg-blue-300 rounded-2xl left-24 top-0 shadow-md"></div>

              <div className="relative z-10 bg-gradient-to-tr from-purple-100 via-white to-blue-100 rounded-2xl shadow-2xl p-6 w-80">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mb-4"></div>
                <h2 className="text-xl font-bold mb-2">
                  Hello, nice to see you back!
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Let us know if you have any questions about the product.
                </p>
                <button className="w-full py-2 bg-black text-white rounded-lg text-sm mb-3">
                  Chat now
                </button>
                <div className="space-y-2">
                  <button className="w-full py-2 border rounded-lg text-sm text-gray-700">
                    Follow us on Instagram
                  </button>
                  <button className="w-full py-2 border rounded-lg text-sm text-gray-700">
                    Follow us on Facebook
                  </button>
                </div>
              </div>

              <div className="absolute bottom-6 -right-14 w-64 bg-white rounded-2xl shadow-2xl p-4 z-20">
                <div className="flex items-center gap-2 border-b pb-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <span className="font-semibold text-sm">Joe</span>
                </div>

                <div className="space-y-2 text-sm max-h-40 overflow-hidden">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      Hi, Tina! 👋 How can I help you today?
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white p-2 rounded-lg max-w-[75%]">
                      Hi! Do you have any 100,000mAh power banks available?
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                    <div className="bg-gray-100 p-2 rounded-lg">
                      Sure! Do you have any preferences for brand, size, or
                      charging speed?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
