import React, { useState } from "react";
import { Plus, Info, ChevronRight, ChevronDown } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const InstallLiveChat = () => {
  const [openSection, setOpenSection] = useState(null);
  const API_URL = import.meta.env.VITE_NODE_BASE_URL;

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  const chatbotId = localStorage.getItem("chatbotId");
  const handleCopyCode = () => {
    const code = `<!-- Start of DigiChat widget -->
<link
  rel="stylesheet"
  href="http://localhost:5173/widget/chat-admin-website.css"
/>

<script>
  window.DigiChatConfig = { chatbot_id: "${chatbotId}" };
  (function () {
    const s = document.createElement("script");
    s.src = "http://localhost:5173/widget/widget.js";
    s.async = true;
    document.head.appendChild(s);
  })();
</script>
<!-- End of DigiChat widget -->`;

    navigator.clipboard
      .writeText(code)
      .then(() => toast.success("Code copied to clipboard!"))
      .catch(() => alert("Failed to copy code"));
  };

  return (
    <div className="max-w-[520px] w-full space-y-8 p-8">
      {/* WooCommerce Card */}
      <div className="border border-blue-300 rounded-lg p-6 bg-white shadow-sm">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <img
                src="https://woocommerce.com/wp-content/themes/woo/images/logo-woocommerce.svg"
                alt="WooCommerce"
                className="h-7"
              />
              <span className="font-semibold text-sm text-[#131317]">
                Install WooCommerce plugin
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Add chat widget to your WooCommerce store.
            </p>
          </div>
          <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700">
            Connect
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-800 mb-3">Need help?</p>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2 border rounded-md hover:bg-gray-50">
              <Plus className="w-4 h-4" /> Invite your developer
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2 border rounded-md hover:bg-gray-50">
              <Info className="w-4 h-4" /> Check install guide
            </button>
          </div>
        </div>
      </div>

      {/* Other Ways to Install */}
      <div>
        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-3">
          Other ways to install
        </p>

        {/* Wix */}
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("wix")}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/06/Wix.com_website_logo.svg"
                alt="Wix"
                className="h-5"
              />
              <span className="text-sm text-gray-800 font-medium">
                Connect with Wix
              </span>
            </div>
            {openSection === "wix" ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {openSection === "wix" && (
            <div className="border-t p-4">
              <p className="text-xs text-gray-600 mb-3">
                Add chat widget to your Wix site.
              </p>
              <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700">
                Connect
              </button>

              {/* Help Section */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-800 mb-2">
                  Need help?
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2 border rounded-md hover:bg-gray-50">
                    <Plus className="w-4 h-4" /> Invite your developer
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2 border rounded-md hover:bg-gray-50">
                    <Info className="w-4 h-4" /> Check install guide
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Manual Install */}
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden mt-3">
          <button
            onClick={() => toggleSection("manual")}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828961.png"
                alt="Manual"
                className="h-5"
              />
              <span className="text-sm text-gray-800 font-medium">
                Install chat widget manually
              </span>
            </div>
            {openSection === "manual" ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {openSection === "manual" && (
            <div className="border-t p-4">
              <p className="text-sm text-gray-700 mb-3">
                1. Copy and paste this code before the{" "}
                <code>&lt;/body&gt;</code> tag on every page of your website.
              </p>

              {/* Code Box */}
              <div className="relative bg-gray-50 border rounded-md p-3 text-xs font-mono text-gray-800 overflow-x-auto">
                <button
                  onClick={handleCopyCode}
                  className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700"
                >
                  Copy code
                </button>
                <pre className="whitespace-pre-wrap">
                  {`<!-- Start of DigiChat widget -->
<link
  rel="stylesheet"
  href="http://localhost:5173/widget/chat-admin-website.css"
/>

<script>
  window.DigiChatConfig = { chatbot_id: "${chatbotId}" };
  (function () {
    const s = document.createElement("script");
    s.src = "http://localhost:5173/widget/widget.js";
    s.async = true;
    document.head.appendChild(s);
  })();
</script>
<!-- End of DigiChat widget -->`}
                </pre>
              </div>

              {/* Help Section */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-800 mb-2">
                  Need help?
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2 border rounded-md hover:bg-gray-50">
                    <Plus className="w-4 h-4" /> Invite your developer
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 text-sm px-4 py-2 border rounded-md hover:bg-gray-50">
                    <Info className="w-4 h-4" /> Check install guide
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Show more ways */}
        <button className="text-sm text-blue-600 mt-3 hover:underline">
          Show more ways
        </button>
      </div>
    </div>
  );
};

export default InstallLiveChat;
