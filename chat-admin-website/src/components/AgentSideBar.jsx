import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopBar from "../components/TopBar";
import {
  Home,
  MessageSquare,
  Trash2,
  Settings,
  Bell,
  Users,
} from "lucide-react";
import Profile from "../profile/Profile";

const AgentSideBar = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMobileSidebar = () => setMobileOpen((prev) => !prev);
  const toggleSettingsSidebar = () => setSettingsOpen((prev) => !prev);

  const handleNavClick = (path) => {
    setSettingsOpen(false);
    navigate(path);
  };


  const user = useSelector((state) => state.auth.user);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-14  bg-gradient-to-b from-[#cf4047] from-60% to-blue-500 text-white flex flex-col justify-between transition-transform duration-300 ease-in-out z-50 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* TOP */}
        <div>
          <div className="flex items-center justify-center h-14 cursor-pointer hover:bg-gray-800">
            {/* <img
              src="https://via.placeholder.com/24 "
              alt="agent"
              className="rounded-full w-8 h-8"
            /> */}
          </div>

          <nav className="flex flex-col items-center gap-2 mt-2">
            <button
              onClick={() => handleNavClick("/agent-dashboard")}
              className="p-3 rounded-md hover:bg-gray-800"
            >
              <Home size={20} />
            </button>
            <button
              onClick={() => handleNavClick("/agent-chats")}
              className="p-3 rounded-md hover:bg-gray-800"
            >
              <MessageSquare size={20} />
            </button>
            <button
              onClick={() => handleNavClick("/agent-trash")}
              className="p-3 rounded-md hover:bg-gray-800"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={() => handleNavClick("/agent-users")}
              className="p-3 rounded-md hover:bg-gray-800"
            >
              <Users size={20} />
            </button>
          </nav>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center gap-2 mb-4">
          <button
            className="p-3 rounded-md hover:bg-gray-800 relative"
            onClick={toggleSettingsSidebar}
          >
            <Settings size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

        <button
  className="p-3 rounded-md hover:bg-gray-800"
  onClick={() => handleNavClick("/agent-notifications")}
>
  <Bell size={20} />
</button>

          {/* User Display
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : user?.role?.charAt(0).toUpperCase()}
            </div>
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
            <div className="absolute right-6 top-0">
              {isOpen && <Profile />}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex flex-col flex-1 ml-14">
        <TopBar onMobileToggle={toggleMobileSidebar} mobileOpen={mobileOpen} />
        <main className="flex-1 p-6 bg-white text-black overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AgentSideBar;
