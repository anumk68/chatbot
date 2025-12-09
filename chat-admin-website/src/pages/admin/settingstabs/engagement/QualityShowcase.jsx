import React from "react";
import { Facebook, Twitter } from "lucide-react"; // using lucide-react icons (optional)

const QualityShowcase = () => {
  const qualityBadgeUnlocked = true; // toggle this to false if locked

  return (
    <div className="min-h-screen bg-white p-8 flex justify-start">
      <div className="max-w-4xl w-full">
        <h2 className="text-xl font-semibold mb-6">Quality showcase</h2>

        {/* Publish Quality Page */}
        <div className="bg-gray-100 rounded-xl p-6 mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Publish Quality page</h3>
          <p className="text-sm text-gray-600 mb-4">
            Share the link to your quality page showing your chat satisfaction and
            responsiveness.{" "}
            <a href="#" className="text-blue-600 underline">
              Learn more
            </a>
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value="https://lc.chat/qa/19277739"
              readOnly
              className="border rounded-lg px-3 py-2 flex-1 text-sm"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Copy
            </button>
          </div>
        </div>

        {/* Share on X / Facebook */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 rounded-xl p-6 flex items-center gap-3">
            <Twitter className="w-6 h-6 text-black" />
            <p className="text-sm text-gray-700">
              Share quality page in a tweet or comment.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 flex items-center gap-3">
            <Facebook className="w-6 h-6 text-blue-600" />
            <p className="text-sm text-gray-700">
              Share quality page in a post or comment.
            </p>
          </div>
        </div>

        {/* Quality Badge */}
        {qualityBadgeUnlocked ? (
          <div className="bg-gray-100 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">
                Quality badge unlocked 🎉
              </h3>
              <p className="text-sm text-gray-500">
                Congrats! You have unlocked the quality badge. Share it on your
                website or socials.{" "}
                <a href="#" className="text-blue-600 underline">
                  Learn more
                </a>
              </p>
            </div>
            <div className="w-24 h-24">
              {/* quality-badge-on.svg pasted inline */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                fill="none"
                className="w-full h-full"
              >
                {/* 🔽 Replace below with your actual SVG paths */}
                <circle cx="32" cy="32" r="30" stroke="#222" strokeWidth="2" />
                <text
                  x="32"
                  y="38"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#222"
                >
                  ★★★★★
                </text>
              </svg>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-gray-900">Quality badge locked</h3>
              <p className="text-sm text-gray-500">
                You need at least 10 rated chats and 70% satisfaction rate in the
                last month to unlock the badge.{" "}
                <a href="#" className="text-blue-600 underline">
                  Learn more
                </a>
              </p>
            </div>
            <div className="w-24 h-24 flex items-center justify-center bg-gray-300 rounded-lg">
              <span className="text-xs text-gray-600">Locked</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityShowcase;
