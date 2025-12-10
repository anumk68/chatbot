import React, { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReportsSidebar = ({ isOpen, onClose }) => {
  const [openSections, setOpenSections] = useState({});
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside
      className={`
         fixed top-16 left-14 h-[calc(100%-56px)] w-64 bg-gradient-to-b from-[#cf4047] from-60% to-blue-500 border-r shadow-lg z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-gray-700">
        <h2 className="font-bold text-white text-xl">Reports</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-lg"
        >
          <X />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col p-2 text-lg text-white overflow-y-auto h-[calc(100%-56px)]">
        {/* Summary Reports */}
        <div>
          <button className="ml-6 px-3 py-2 rounded hover:bg-gray-800 text-left">
            My saved views
          </button>
          <button
            onClick={() => toggleSection("summary")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.summary ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <span>Summary</span>
          </button>
          {openSections.summary && (
            <div className="ml-6 flex flex-col text-gray-300">
              <button className="px-2 py-1 hover:text-white text-left">
                Last 7 Days
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Chat Reports */}
        <div>
          <button
            onClick={() => toggleSection("chatReports")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.chatReports ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <span>Chat</span>
          </button>
          {openSections.chatReports && (
            <div className="ml-6 flex flex-col text-gray-300">
              <button className="px-2 py-1 hover:text-white text-left">
                Total chats
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Chat engagement
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Missed chats
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Campaign conversion
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Tags usage
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Chat satisfaction
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Chat Availability
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Chat forms
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Chat duration
              </button>
            </div>
          )}
        </div>

        {/* Agent Performance */}
        <div>
          <button
            onClick={() => toggleSection("agentPerformance")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.agentPerformance ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <span>Agent</span>
          </button>
          {openSections.agentPerformance && (
            <div className="ml-6 flex flex-col text-gray-300">
              <button className="px-2 py-1 hover:text-white text-left">
                Agent Performance
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Chat response time
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Staffing prediction
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Agent activity
              </button>
            </div>
          )}
        </div>

        {/* Customers */}
        <div>
          <button
            onClick={() => toggleSection("customers")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.customers ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <span>Customers</span>
          </button>
          {openSections.customers && (
            <div className="ml-6 flex flex-col text-gray-300">
              <button
              onClick={() => navigate("/all-customers")}

                className="px-2 py-1 hover:text-white text-left"
              >
                All Customers
              </button>

              <button className="px-2 py-1 hover:text-white text-left">
                Queued customers
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Queued abandonment
              </button>
            </div>
          )}
        </div>

        {/* Insights */}
        <div>
          <button
            onClick={() => toggleSection("insights")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.insights ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <span>Insights</span>
          </button>
          {openSections.insights && (
            <div className="ml-6 flex flex-col text-gray-300">
              <button className="px-2 py-1 hover:text-white text-left">
                Top customer questions
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Alert
              </button>
            </div>
          )}
        </div>

        {/* Ecommerce */}
        <div>
          <button
            onClick={() => toggleSection("ecommerce")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.ecommerce ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <span>Ecommerce</span>
          </button>
          {openSections.ecommerce && (
            <div className="ml-6 flex flex-col text-gray-300">
              <button className="px-2 py-1 hover:text-white text-left">
                Achieve goals
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Tracked sales
              </button>
            </div>
          )}
        </div>

        {/* Export Raw Data */}
        <div>
          <button
            onClick={() => toggleSection("exportrawdata")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.exportrawdata ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
            <span>Export Raw Data</span>
          </button>
          {openSections.exportrawdata && (
            <div className="ml-6 flex flex-col text-gray-300">
              <button className="px-2 py-1 hover:text-white text-left">
                Generate report
              </button>
              <button className="px-2 py-1 hover:text-white text-left">
                Scheduled report
              </button>
            </div>
          )}
        </div>

        {/* Reviews */}
        <button className="px-3 py-2 rounded hover:bg-gray-800 text-left">
          Reviews
        </button>
      </nav>
    </aside>
  );
};

export default ReportsSidebar;
