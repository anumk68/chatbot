import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginSystem from "../pages/auth/LoginSystem";

/* Admin Imports */
import Board from "../pages/admin/board.jsx";
import SideBar from "../components/SideBar";
import ChatsPage from "../pages/admin/ChatsPage";
import Archives from "../pages/admin/Archives";
import Teams from "../pages/admin/Teams.jsx";
import Users from "../pages/admin/Users";
import AssignCustomers from "../pages/admin/AssignCustomers";
import SettingsLayout from "../layout/SettingsLayout";
import EmailByHelpDesk from "../pages/admin/settingstabs/EmailByHelpDesk";
import FacebookMessenger from "../pages/admin/settingstabs/FacebookMessenger";
import AppleMessages from "../pages/admin/settingstabs/AppleMessages";
import ChatPage from "../pages/admin/settingstabs/Chats/ChatPage";
import Customization from "../pages/admin/settingstabs/websitewidget/Customization";
import Language from "../pages/admin/settingstabs/websitewidget/Language";
import Availability from "../pages/admin/settingstabs/websitewidget/Availability";
import WelcomeScreen from "../pages/admin/settingstabs/websitewidget/WelcomeScreen";
import PreChatForm from "../pages/admin/settingstabs/forms/PreChatForm";
import AskForEmail from "../pages/admin/settingstabs/forms/AskForEmail";
import PostChat from "../pages/admin/settingstabs/forms/PostChat";
import TicketForm from "../pages/admin/settingstabs/forms/TicketForm";
import EyeCatcher from "../pages/admin/settingstabs/engagement/EyeCatcher";
import ChatButton from "../pages/admin/settingstabs/engagement/ChatButton";
import QualityShowcase from "../pages/admin/settingstabs/engagement/QualityShowcase";
import Tags from "../pages/admin/settingstabs/Tags/Tags";
import SalesTracker from "../pages/admin/settingstabs/salestracker/SalesTracker";
import ChatAssignment from "../pages/admin/settingstabs/chatsettings/ChatAssignment";
import TranscriptForwarding from "../pages/admin/settingstabs/chatsettings/TranscriptForwarding";
import FileSharing from "../pages/admin/settingstabs/chatsettings/FileSharing";
import InactivityTimeouts from "../pages/admin/settingstabs/chatsettings/InactivityTimeouts";
import TrustedDomains from "../pages/admin/settingstabs/security/TrustedDomains";
import BannedCustomer from "../pages/admin/settingstabs/security/BannedCustomer";
import CreditCardMasking from "../pages/admin/settingstabs/security/CreditCardMasking";
import LoginSettings from "../pages/admin/settingstabs/security/LoginSettings";
import InstallLiveChat from "../pages/admin/settingstabs/InstallLiveChat";
import AllCustomers from "../pages/admin/AllCustomers.jsx";
import ALlWebsites from "../pages/admin/AllWebsites.jsx";
import AllMessages from "../pages/admin/AllMessages.jsx";
import Traffic from "../pages/admin/engage/Traffic.jsx";
import Compaign from "../pages/admin/engage/Compaign.jsx";

/* Agent Imports */
import AgentSideBar from "../components/AgentSideBar";
import AgentDashboard from "../pages/agent/AgentDashboard";
import AgentChats from "../pages/agent/AgentChats";

/* Auth & ProtectedRoute */
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import AgentLoginSystem from "../pages/auth/agent/AgentLoginSystem.jsx";
import LoginForm from "../pages/auth/LoginForm.jsx";
import GroupChat from "../pages/agent/GroupChat.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public / Auth Routes */}
      <Route path="/" element={<LoginSystem />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/agent-login" element={<AgentLoginSystem />} />
      <Route path="/agent-signup" element={<AgentLoginSystem />} />

      <Route path="/google-login" element={<LoginSystem />} />
      <Route path="/facebook-login" element={<LoginForm />} />

      {/* ---------------- ADMIN ROUTES ---------------- */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <Board />
            </SideBar>
          </ProtectedRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <ChatsPage />
            </SideBar>
          </ProtectedRoute>
        }
      />

      <Route
        path="/all-messages"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <AllMessages />
            </SideBar>
          </ProtectedRoute>
        }
      />

      <Route
        path="/assigncustomer"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <AssignCustomers />
            </SideBar>
          </ProtectedRoute>
        }
      />

      <Route
        path="/trash"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <Archives />
            </SideBar>
          </ProtectedRoute>
        }
      />

      <Route
        path="/team"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <Teams />
            </SideBar>
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <Users />
            </SideBar>
          </ProtectedRoute>
        }
      />

      {/* Direct route for All Customers / Websites */}
      <Route
        path="/all-customers"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <AllCustomers />
            </SideBar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/website-list"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <ALlWebsites />
            </SideBar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/traffics"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <Traffic />
            </SideBar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/campaigns"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <Compaign />
            </SideBar>
          </ProtectedRoute>
        }
      />

      {/* ---------------- SETTINGS ROUTES ---------------- */}
      <Route
        path="/settings/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <SideBar>
              <SettingsLayout />
            </SideBar>
          </ProtectedRoute>
        }
      >
        <Route path="install-livechat" element={<InstallLiveChat />} />
        <Route path="email-by-livechat" element={<EmailByHelpDesk />} />
        <Route path="facebook-messenger" element={<FacebookMessenger />} />
        <Route path="apple-messages" element={<AppleMessages />} />
        <Route path="chat-page" element={<ChatPage />} />

        {/* WebsiteWidget */}
        <Route path="websitewidget/customization" element={<Customization />} />
        <Route path="websitewidget/language" element={<Language />} />
        <Route path="websitewidget/availability" element={<Availability />} />
        <Route
          path="websitewidget/welcome-screen"
          element={<WelcomeScreen />}
        />

        {/* Forms */}
        <Route path="forms/pre-chat" element={<PreChatForm />} />
        <Route path="forms/ask-email" element={<AskForEmail />} />
        <Route path="forms/post-chat" element={<PostChat />} />
        <Route path="forms/ticket" element={<TicketForm />} />

        {/* Engagement */}
        <Route path="engagement/eye-catcher" element={<EyeCatcher />} />
        <Route path="engagement/chat-button" element={<ChatButton />} />
        <Route
          path="engagement/quality-showcase"
          element={<QualityShowcase />}
        />

        {/* Chat Settings */}
        <Route
          path="chatsettings/chat-assignment"
          element={<ChatAssignment />}
        />
        <Route
          path="chatsettings/transcript-forwarding"
          element={<TranscriptForwarding />}
        />
        <Route path="chatsettings/file-sharing" element={<FileSharing />} />
        <Route
          path="chatsettings/inactivity-timeouts"
          element={<InactivityTimeouts />}
        />

        {/* Security */}
        <Route path="security/trusted-domains" element={<TrustedDomains />} />
        <Route path="security/banned-customers" element={<BannedCustomer />} />
        <Route
          path="security/credit-card-masking"
          element={<CreditCardMasking />}
        />
        <Route path="security/login-settings" element={<LoginSettings />} />

        {/* Additional */}
        <Route path="all-customers" element={<AllCustomers />} />
        <Route path="website-list" element={<ALlWebsites />} />
        <Route path="traffics" element={<Traffic />} />
        <Route path="compaigns" element={<Compaign />} />
        <Route path="tags" element={<Tags />} />
        <Route path="sales-tracker" element={<SalesTracker />} />
      </Route>

      {/* ---------------- AGENT ROUTES ---------------- */}
      <Route
        path="/agent-dashboard"
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <AgentSideBar>
              <AgentDashboard />
            </AgentSideBar>
          </ProtectedRoute>
        }
      />

      <Route
        path="/agent-chats"
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <AgentSideBar>
              <AgentChats />
            </AgentSideBar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/group-chats"
        element={
          <ProtectedRoute allowedRoles={["agent"]}>
            <AgentSideBar>
              <GroupChat />
            </AgentSideBar>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
