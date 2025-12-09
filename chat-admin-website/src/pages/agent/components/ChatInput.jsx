import React, { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { Smile, Paperclip, SendHorizonal, X } from "lucide-react";

const ChatInput = ({ handleSend }) => {
  const [chatInput, setChatInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const sendMessage = () => {
    if (!chatInput.trim() && !selectedFile) return;

    handleSend(chatInput, selectedFile);

    setChatInput("");
    setSelectedFile(null);
    setImagePreview(null);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-3 bg-white border-t relative flex flex-col">
      
      {/* FILE PREVIEW */}
      {imagePreview && (
        <div className="mb-3 relative w-32 h-32">
          <img
            src={imagePreview}
            alt="preview"
            className="w-32 h-32 object-cover rounded-lg shadow-md border"
          />
          <button
            onClick={() => {
              setSelectedFile(null);
              setImagePreview(null);
            }}
            className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* INPUT BAR */}
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full border shadow-sm">

        {/* EMOJI BUTTON */}
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="hover:bg-gray-200 p-1 rounded-full"
        >
          <Smile size={22} className="text-gray-600" />
        </button>

        {/* FILE UPLOAD */}
        <input type="file" hidden ref={fileInputRef} onChange={handleFileSelect} />
        <button
          onClick={() => fileInputRef.current.click()}
          className="hover:bg-gray-200 p-1 rounded-full"
        >
          <Paperclip size={22} className="text-gray-600" />
        </button>

        {/* INPUT FIELD */}
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent px-2 py-1 focus:outline-none text-gray-800"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        {/* SEND BUTTON */}
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition flex items-center justify-center"
        >
          <SendHorizonal size={20} className="text-white" />
        </button>
      </div>

      {/* EMOJI PICKER */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-3 z-50 shadow-lg">
          <EmojiPicker
            onEmojiClick={(e) => setChatInput((prev) => prev + e.emoji)}
          />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
