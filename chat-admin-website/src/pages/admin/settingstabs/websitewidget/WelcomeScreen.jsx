import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { ChevronRight, ChevronDown } from "lucide-react";

const WelcomeScreen = () => {
  const [enabled, setEnabled] = useState(true);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex bg-white min-h-screen">
      <div className="w-[65%] px-6 py-4">
        <h1 className="text-base font-medium text-gray-900 mb-6">
          Welcome screen
        </h1>

        <div className="border rounded-md mb-4">
          <div
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection("customize")}
          >
            <h2 className="text-sm font-medium text-gray-900">
              Customize header
            </h2>
            {openSection === "customize" ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </div>

          {openSection === "customize" && (
            <div className="p-4 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">
                    Show logo
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Brand your widget’s welcome screen with your company logo
                  </p>
                </div>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? "bg-green-600" : "bg-gray-300"
                  } relative inline-flex h-5 w-10 items-center rounded-full`}
                >
                  <span
                    className={`${
                      enabled ? "translate-x-5" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>

              <div className="flex flex-col items-start">
                <div className="w-28 h-20 border border-dashed rounded-md flex items-center justify-center bg-gray-50">
                  <img
                    src="https://img.icons8.com/fluency/48/chat.png"
                    alt="logo"
                    className="w-8 h-8"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Max. 1500×1000 px <br /> jpg, jpeg, png, gif
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 block mb-1">
                  Welcome text
                </label>
                <input
                  type="text"
                  defaultValue="Welcome! Text us"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-md mb-4">
          <div
            className="px-4 py-3 text-sm font-medium text-gray-900 flex justify-between items-center cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection("manage")}
          >
            Manage content
            {openSection === "manage" ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </div>

          {openSection === "manage" && (
            <div className="p-4 space-y-4 bg-gray-50">
              <div className="border rounded-md p-4 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {" "}
                    LiveChat
                  </h3>
                  <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">
                    Active
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  Invite customers to chat or let them know when agents are
                  offline.
                </p>
                <button className="px-3 py-1 border rounded-md text-xs font-medium">
                  Customize
                </button>
              </div>

              <div className="border rounded-md p-4 bg-white">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  📡 Other channels
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  Offer more ways to connect by activating WhatsApp as
                  marketplace integrated channel in your chat widget.
                </p>
                <div className="flex gap-3">
                  <div className="border rounded-md px-3 py-2 text-sm flex items-center gap-2 bg-white">
                    <span> WhatsApp</span>
                  </div>
                  <div className="border rounded-md px-3 py-2 text-xs text-gray-500 bg-gray-100 flex items-center justify-center flex-1">
                    More channels <br /> coming soon
                  </div>
                </div>
                <button className="mt-3 px-3 py-1 border rounded-md text-xs font-medium">
                  Go to marketplace
                </button>
              </div>

              <div className="border rounded-md p-4 bg-white">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  📖 KnowledgeBase
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Let customers browse your help center articles inside your
                  chat widget.
                </p>
                <button className="px-3 py-1 border rounded-md text-xs font-medium">
                  Install
                </button>
              </div>

              <div className="border rounded-md p-4 bg-white">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  🛠 HelpDesk
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Let customers leave messages when agents are offline. Messages
                  are saved as tickets in your HelpDesk.
                </p>
                <button className="px-3 py-1 border rounded-md text-xs font-medium">
                  Install
                </button>
              </div>

              <div className="border rounded-md p-4 bg-white">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  🔗 Custom links
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Elevate your customer service with links. Direct customers to
                  help centers, social media, or meeting scheduling.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-md">
          <div
            className="px-4 py-3 text-sm font-medium text-gray-900 flex justify-between items-center cursor-pointer hover:bg-gray-50"
            onClick={() => toggleSection("settings")}
          >
            Change settings
            {openSection === "settings" ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </div>

          {openSection === "settings" && (
            <div className="p-4 bg-gray-50 text-sm text-gray-700">
              <p>⚙️ Settings panel content goes here...</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-[35%] border-l bg-gray-50 p-6">
        <h2 className="text-sm font-medium text-gray-900 mb-4">Preview</h2>

        <div className="flex flex-col items-center">
          <div className="w-64 h-[460px] bg-black rounded-xl overflow-hidden shadow relative">
            <div className="bg-gradient-to-b from-blue-600 to-blue-800 p-4">
              <img
                src="https://img.icons8.com/fluency/48/chat.png"
                alt="icon"
                className="w-6 h-6 mb-2"
              />
              <h3 className="text-white font-bold text-lg leading-snug">
                Welcome!
                <br />
                Text us
              </h3>
            </div>

            <div className="absolute top-28 left-3 right-3 bg-gray-900 rounded-lg p-3 text-white text-xs shadow-md">
              <p className="font-medium">Bhagya Digirushsolutions</p>
              <p className="text-gray-300">Hello. How may I help you?</p>
              <button className="mt-2 w-full bg-blue-600 rounded-md py-1.5 text-xs font-medium hover:bg-blue-700 transition">
                Back to chat →
              </button>
            </div>

            <div className="absolute bottom-0 w-full bg-black border-t border-gray-800 flex justify-around py-2">
              <div className="text-center text-gray-400 text-xs">
                <div>🏠</div>
                Home
              </div>
              <div className="text-center text-gray-400 text-xs">
                <div></div>
                Chat
              </div>
            </div>
          </div>

          {/* Footer link */}
          <p className="mt-4 text-xs text-blue-600 underline cursor-pointer">
            Test it out on the chat page
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
