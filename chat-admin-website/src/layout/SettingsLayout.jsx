import React from "react";

import { Outlet } from "react-router-dom";
import SettingsSidebar from "../components/SettingsSidebar";

const SettingsLayout = ({ isOpen, onClose }) => {
  return (
    <div className="flex">
      <SettingsSidebar isOpen={true} onClose={onClose} />
      <div className="flex-1 ml-64 bg-white-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};
export default SettingsLayout;