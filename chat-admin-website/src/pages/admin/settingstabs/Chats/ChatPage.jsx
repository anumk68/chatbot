import React from "react";
import { Copy, Facebook, QrCode, Share2 } from "lucide-react";

const ChatPage = () => {
  return (
    <div className="bg-white min-h-screen p-6">
      {/* Top section */}
      <div className="flex flex-col md:flex-row bg-gray-50 rounded-lg p-6 gap-6">
        {/* Left content */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Chat with customers wherever they are
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Share a link to your chat page without setting up a website.
            Use it in emails, newsletters, digital files, and on social media.
          </p>
          <a href="#" className="text-blue-600 text-sm font-medium hover:underline">
            Test it out
          </a>

          {/* Link box */}
          <div className="flex items-center mt-4 rounded-lg overflow-hidden w-full max-w-md">
            <input
              type="text"
              value="https://direct.lc.chat/19277739/"
              readOnly
              className="flex-1 px-3 py-2 text-sm text-gray-700 bg-white outline-none"
            />
            <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm flex items-center gap-1">
              <Copy size={16} /> Copy
            </button>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="flex-1 flex justify-center">
          <div className="bg-gradient-to-r from-black to-gray-800 rounded-lg p-6 text-white w-64 h-40 flex items-center justify-center">
            <p className="text-center text-sm">
              Hello! <br /> Welcome to our chat page.
            </p>
          </div>
        </div>
      </div>

      {/* Middle section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 bg-gray-50">
        <div className="rounded-lg p-4 text-center text-sm text-gray-700">
          <p className="font-medium">{"</>"} No code. No setup.</p>
        </div>
        <div className="rounded-lg p-4 text-center text-sm text-gray-700">
          <p className="font-medium">⚡ Works out of the box.</p>
        </div>
        <div className="rounded-lg p-4 text-center text-sm text-gray-700">
          <p className="font-medium">🔗 Works with groups</p>
        </div>
      </div>

      {/* Bottom section */}
     {/* Bottom section */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
  {/* Share on Twitter */}
  <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
    <div>
      <p className="font-semibold text-sm">Share on X (Twitter)</p>
      <p className="text-xs text-gray-600 mt-1">
        Take support cases off X by sharing your chat page link in a tweet or comment.
      </p>
    </div>
    <img
      src="https://cdn-icons-png.flaticon.com/512/5968/5968958.png"
      alt="Twitter X"
      className="w-8 h-8 rounded-md"
    />
  </div>

  {/* Share on Facebook */}
  <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
    <div>
      <p className="font-semibold text-sm">Share on Facebook</p>
      <p className="text-xs text-gray-600 mt-1">
        Let customers know about your chat in a Facebook post or comment.
      </p>
    </div>
    <img
      src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
      alt="Facebook"
      className="w-8 h-8 rounded-full"
    />
  </div>

  {/* Share QR Code */}
  <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4">
    <div>
      <p className="font-semibold text-sm">Share QR code</p>
      <p className="text-xs text-gray-600 mt-1">
        Let customers contact you by scanning the QR code with their phones.
      </p>
    </div>
    <img
      src="/src/assets/qr-code.png"  // <-- apna QR image yaha lagao
      alt="QR Code"
      className="w-12 h-12 rounded-md"
    />
  </div>
</div>

    </div>
  );
};

export default ChatPage;
