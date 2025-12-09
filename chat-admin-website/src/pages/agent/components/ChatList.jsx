// Premium ChatList with avatars, hover effects, unread feel & pagination
import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

const ChatList = ({ conversations, activeConversation, setActiveConversation }) => {
  const ITEMS_PER_PAGE = 10; // Chats per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(conversations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentChats = conversations.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col h-full select-none">
      {/* Header */}
      <h2 className="p-4 font-semibold text-lg border-b bg-white sticky top-0 z-10 shadow-sm">
        Chats
      </h2>

      {/* Chat List */}
      <div className="overflow-y-auto flex-1 custom-scrollbar px-2 py-2">
        {currentChats.map((c) => {
          const isActive = activeConversation?.conversation_id === c.conversation_id;

          return (
            <div
              key={c.conversation_id}
              onClick={() => setActiveConversation(c)}
              className={`flex items-center p-3 cursor-pointer rounded-xl transition-all duration-200 shadow-sm mb-2 border
                ${
                  isActive
                    ? "bg-blue-50 border-blue-300 scale-[1.01]"
                    : "bg-white hover:bg-gray-100 border-gray-200"
                }
              `}
            >
              {/* Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-lg font-semibold shadow">
                {c.user_one?.[0]}
              </div>

              {/* Details */}
              <div className="ml-3 flex-1 overflow-hidden">
                <p className="font-semibold truncate text-gray-900">{c.user_one}</p>

                {/* Last message / file indicator */}
                <div className="flex items-center gap-1 text-gray-500 text-sm truncate">
                  {c.last_file_type?.startsWith("image") && <ImageIcon size={14} />}
                  <span>{c.last_message || "No messages yet"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center p-2 border-t bg-gray-50">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatList;
