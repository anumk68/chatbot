import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import SettingsSidebar from "../components/SettingsSidebar";
import ReportsSidebar from "../components/ReportsSidebar";
import EngageSidebar from "../components/EngageSidebar";
import logodigirush from "../assets/digi-logo.png";
import {
  Home,
  MessageSquare,
  Star,
  Zap,
  Trash2,
  Users,
  BarChart3,
  Grid,
  CheckSquare,
  Settings,
  Bell,
  MessageCircle,
} from "lucide-react";
import AutomateSidebar from "./AutomateSidebar";
import { useSelector } from "react-redux";
import Profile from "../profile/Profile";
import { UserCheck } from "lucide-react";

const SideBar = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [engageOpen, setEngageOpen] = useState(false);
  const [automateOpen, setAutomateOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileSidebar = () => setMobileOpen((prev) => !prev);
  const user = useSelector((state) => state.auth.user);
  //  Updated: close others when toggling settings
  const toggleSettingsSidebar = () => {
    setSettingsOpen((prev) => !prev);
    setReportsOpen(false);
    setEngageOpen(false);
    setAutomateOpen(false);
  };

  const toggleReportsSidebar = () => {
    setReportsOpen((prev) => !prev);
    setSettingsOpen(false);
    setEngageOpen(false);
    setAutomateOpen(false);
  };

  const toggleEngageSidebar = () => {
    setEngageOpen((prev) => !prev);
    setSettingsOpen(false);
    setReportsOpen(false);
    setAutomateOpen(false);
  };

  const toggleAutomateSidebar = () => {
    setAutomateOpen((prev) => !prev);
    setSettingsOpen(false);
    setReportsOpen(false);
    setEngageOpen(false);
  };

  // Handles normal nav buttons (closes all sidebars before navigating)
  const handleNavClick = (path) => {
    setSettingsOpen(false);
    setReportsOpen(false);
    setEngageOpen(false);
    setAutomateOpen(false);
    navigate(path);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* -------- SIDEBAR -------- */}
      <aside
        className={`
          fixed top-0 left-14 md:!left-0 h-full w-15 bg-gradient-to-l from-blue-800 to-blue-500 text-white flex flex-col justify-between
          transition-transform duration-300 ease-in-out z-50 cursor-pointer
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* TOP ZONE */}
        <div>
          <div className="flex items-center justify-center h-14 cursor-pointer hover:bg-gray-800">
            {/* <img
              src="https://via.placeholder.com/24 "
              alt="account"
              className="rounded-full w-8 h-8"
            /> */}
          </div>

          <nav className="flex flex-col items-center gap-2 mt-2 ">
            <button
              onClick={() => handleNavClick("/admin-Dashboard")}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <Home size={20} />
            </button>
            <button
              onClick={() => handleNavClick("/messages")}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <MessageSquare size={20} />
            </button>

            <button onClick={()=>handleNavClick("/all-messages")}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"> 
              <MessageCircle size={20} />
              </button>
            <button
              onClick={toggleEngageSidebar}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <Star size={20} />
            </button>

            <button
              onClick={toggleAutomateSidebar}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <Zap size={20} />
            </button>
            <button
              onClick={() => handleNavClick("/assigncustomer")}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <UserCheck size={20} />
            </button>
            <button
              onClick={() => handleNavClick("/trash")}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <Trash2 size={20} />
            </button>

            <button
              onClick={() => handleNavClick("/team")}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            >
           <Users size={20} />
            </button>

            <button
              onClick={toggleReportsSidebar}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <BarChart3 size={20} />
            </button>

            {/* <button
              onClick={() => handleNavClick("/grid")}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <Grid size={20} />
            </button> */}
            {/* <button
              onClick={() => handleNavClick("/tasks")}
              className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <CheckSquare size={20} />
            </button> */}
          </nav>
        </div>

        {/* BOTTOM ZONE */}
        <div className="flex flex-col items-center gap-2 mb-12">
          <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-md">
            3 days
          </div>

          <button
            className="p-3 rounded-md hover:bg-gray-800 relative cursor-pointer"
            onClick={toggleSettingsSidebar} //  Will now close/open settings
          >
            <Settings size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full cursor-pointer"></span>
          </button>

          {/* <button
            className="p-3 rounded-md hover:bg-gray-800 cursor-pointer"
            onClick={() => handleNavClick("/notifications")}
          >
            <Bell size={20} />
          </button> */}

          {/* <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm cursor-pointer">
          {user?.name ? user.name.charAt(0).toUpperCase() : user?.role?.charAt(0).toUpperCase()}

          </div> */}

          {/* Profile Section at Bottom */}
          <div className="relative mt-auto pt-4">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm cursor-pointer"
            >
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : user?.role?.charAt(0).toUpperCase()}
            </div>
            <div className="absolute right-6 top-0 cursor-pointer">
              {isOpen && <Profile />}
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebars */}
      <SettingsSidebar
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <ReportsSidebar
        isOpen={reportsOpen}
        onClose={() => setReportsOpen(false)}
      />
      <EngageSidebar isOpen={engageOpen} onClose={() => setEngageOpen(false)} />
      <AutomateSidebar
        isOpen={automateOpen}
        onClose={() => setAutomateOpen(false)}
      />

      {/* MAIN */}
      <div className="flex flex-col flex-1 ml-14">
        <TopBar onMobileToggle={toggleMobileSidebar} mobileOpen={mobileOpen} />
        <main className="flex-1 p-0 bg-white text-black overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SideBar;
