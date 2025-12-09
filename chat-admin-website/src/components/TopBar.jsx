import React, { useState } from "react";
import {
  AlignJustify,
  X,
  UsersRound,
  MessageSquare,
  Zap,
  ChevronUp,
  ChevronDown,
  ChartBar,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logodigirush from "../assets/digi-logo.png";

const TopBar = ({ onCollapseToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [engageOpen, setEngageOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  //  This is the key change: handle desktop vs mobile differently
  const toggleMenu = () => {
    if (window.innerWidth >= 1024) {
      // Desktop: trigger sidebar collapse
      onCollapseToggle?.(); // optional chaining if prop not passed
    } else {
      // Mobile: toggle dropdown menu
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const linkClass =
    "flex items-center gap-3 px-4 py-2 hover:bg-gray-800 rounded-md";

  return (
    <>
      {/* TopBar Header */}
      <div className="bg-wh8te text-white px-4 py-0 flex items-center justify-between  border-gray-800 shadow-md h-16 relative z-50">
        <div className="w-40 mb-1 object-cover"> 
           <img
              src={logodigirush}
              alt="account"
              className="w-full h-full rounded-md"
            />
            </div>
        {/* <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <input
            type="text"
            placeholder="Search or ask"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full focus:outline-none"
          />
        </div> */}

        <div className="text-white p-2 rounded flex items-center space-x-4 cursor-pointer">
          <div
            className="relative flex -space-x-2 items-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => navigate("/team")}
          >
            <div className="relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold uppercase z-20 bg-blue-600">
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-gray-900"></div>
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : user?.role?.charAt(0).toUpperCase()}
            </div>
            <div className="relative w-12 h-12 rounded-full overflow-hidden z-10">
              <img
                className="w-full h-full object-cover rounded-full"
                src="https://cdn.files-text.com/us-south1/api/lc/img/19219173/159027dc6d5da3f9a9bc2ed6578b183c.png"
                alt="Avatar"
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>

            {showTooltip && (
              <div className="absolute left-0 top-10 w-36 p-3 bg-white text-black shadow-lg rounded z-50">
                <p className="text-sm font-semibold">Accepting chats:</p>
                <p className="text-sm mt-1"> 1 agent</p>
                <p className="text-sm">🤖 1 bot</p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium">2</p>

          <button
            type="button"
            className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7-7v14"
              />
            </svg>
            <span className="text-lg font-medium">Invite</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && window.innerWidth < 1024 && (
        <div className="lg:hidden bg-black text-white px-4 py-4 space-y-2 shadow-md z-40">
          <nav className="space-y-2">
            <NavLink to="/admin" className={linkClass}>
              <ChartBar size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/admin/agents" className={linkClass}>
              <UsersRound size={18} />
              <span>Manage Agents</span>
            </NavLink>

            <NavLink to="/admin/chats" className={linkClass}>
              <MessageSquare size={18} />
              <span>Chats</span>
            </NavLink>

            <NavLink to="/admin/settings" className={linkClass}>
              <Zap size={18} />
              <span>Settings</span>
            </NavLink>

            {/* Engage Dropdown */}
            <div>
              <button
                onClick={() => setEngageOpen(!engageOpen)}
                className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <Zap size={18} />
                  <span>Engage</span>
                </div>
                {engageOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {engageOpen && (
                <div className="ml-10 mt-1 space-y-1 text-sm text-gray-300">
                  <NavLink
                    to="/admin/traffic"
                    className="block px-2 py-1 rounded-md hover:bg-gray-700"
                  >
                    Traffic
                  </NavLink>
                  <NavLink
                    to="/admin/campaigns"
                    className="block px-2 py-1 rounded-md hover:bg-gray-700"
                  >
                    Campaigns
                  </NavLink>
                  <NavLink
                    to="/admin/goals"
                    className="block px-2 py-1 rounded-md hover:bg-gray-700"
                  >
                    Goals
                  </NavLink>
                </div>
              )}
            </div>

            {/* Reports Dropdown */}
            <div>
              <button
                onClick={() => setReportsOpen(!reportsOpen)}
                className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <ChartBar size={18} />
                  <span>Reports</span>
                </div>
                {reportsOpen ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {reportsOpen && (
                <div className="ml-10 mt-1 space-y-1 text-sm text-gray-300">
                  <NavLink
                    to="/admin/reports"
                    className="block px-2 py-1 rounded-md hover:bg-gray-700"
                  >
                    View Reports
                  </NavLink>
                </div>
              )}
            </div>

            {/* Teams */}
            <NavLink to="/team" className={linkClass}>
              <UsersRound size={18} />
              <span>Teams</span>
            </NavLink>
          </nav>

          {/* Profile Menu */}
          <div className="relative mt-6">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm cursor-pointer"
            >
              AD
            </div>
            {isOpen && <div className="absolute right-0 mt-2">Profile</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
