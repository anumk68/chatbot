import React, { useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";


const AutomateSidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleNavigation = (childName) => {
    setActiveTab(childName);

    switch (childName) {
      case "Websites List":
        navigate("/website-list");
        break;

      case "Guidelines of pdf":
         window.open("../public/guidelines.pdf", "_blank");
        break;

      default:
        break;
    }
  };

  const menuItems = [
    { name: "Overview", hasDropdown: false },
    { name: "Chatbots", hasDropdown: false },
    {
      name: "Knowledge hub",
      hasDropdown: true,
      children: [
        { name: "Websites List"},
        { name: "Guidelines of pdf" },
      ],
    },
    {
      name: "Canned responses",
      hasDropdown: true,
      children: [
        { name: "Responses list" },
        { name: "Suggested responses" },
      ],
    },
    { name: "Routing rules", hasDropdown: false },
    { name: "Workflows", hasDropdown: false, tag: "Beta" },
  ];

  return (
    <aside
      className={`
        fixed top-15.5 left-14 h-[calc(100%-56px)] w-64 bg-gradient-to-b from-[#cf4047] from-60% to-blue-500 border-r shadow-lg z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between p-4 border-gray-700">
        <h2 className="font-bold text-xl text-white">Automate</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-lg"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex flex-col p-2 text-sm overflow-y-auto h-[calc(100%-56px)]">
        {menuItems.map((item) => (
          <div key={item.name}>
            <button
              onClick={() =>
                item.hasDropdown
                  ? toggleDropdown(item.name)
                  : setActiveTab(item.name)
              }
              className={`w-full flex items-center text-white justify-between px-3 py-2 rounded transition text-lg
                ${
                  activeTab === item.name
                    ? "bg-gray-800 text-white"
                    : "text-white hover:text-white hover:bg-gray-800"
                }`}
            >
              <span>{item.name}</span>

              <div className="flex items-center gap-2">
                {item.tag && (
                  <span className="text-xs bg-indigo-700 px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                )}

                {item.hasDropdown &&
                  (openDropdowns[item.name] ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  ))}
              </div>
            </button>

            {item.hasDropdown && openDropdowns[item.name] && (
              <div className="ml-5 mt-1 flex flex-col gap-1 text-white">
                {item.children.map((child) => (
                  <button
                    key={child.name}
                    onClick={() => handleNavigation(child.name)}
                    className={`w-full text-lg flex items-center justify-between px-2 py-1.5 rounded text-left transition
                      ${
                        activeTab === child.name
                          ? "text-white"
                          : "text-white-400 hover:text-white"
                      }`}
                  >
                    <span>{child.name}</span>

                    {child.badge !== undefined && (
                      <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full">
                        {child.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AutomateSidebar;
