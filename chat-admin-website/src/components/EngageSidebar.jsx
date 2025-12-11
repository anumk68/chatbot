import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EngageSidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Traffic");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Traffic", badge: 0, label: "customers", path: "/traffics" },
    { name: "Campaigns", badge: 5, label: "active", path: "/campaigns" },
    // { name: "Goals", badge: 0, label: "active", path: "/goals" },
  ];

  const handleClick = (item) => {
    setActiveTab(item.name);
    navigate(item.path); 
    onClose();
  };

  return (
    <aside
      className={`
        fixed top-15 left-14 h-[calc(100%-56px)] w-64 
        bg-gradient-to-b from-[#cf4047] from-60% to-blue-500 
        border-r shadow-lg z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-white/40">
        <h2 className="font-bold text-xl text-white">Engage</h2>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <X size={18} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col p-2 text-sm overflow-y-auto h-[calc(100%-56px)]">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleClick(item)}
            className={`w-full flex items-center justify-between 
              px-3 py-2 rounded text-lg text-left transition
              ${
                activeTab === item.name
                  ? "bg-gray-800 text-white"
                  : "text-white hover:bg-gray-800 hover:text-white"
              }
            `}
          >
            <span>{item.name}</span>
            <span className="flex items-center gap-1 text-base text-gray-300">
              <span className="bg-gray-700 px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default EngageSidebar;
