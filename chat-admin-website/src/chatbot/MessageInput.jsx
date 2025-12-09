import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ onSend, user, conversationId, chatbotId }) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await onSend(message.trim(), null);
    setMessage("");
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    await onSend("", file);
    setUploading(false);
    e.target.value = null;
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="p-2 border-t relative">
      {showEmoji && (
        <div className="absolute bottom-12 left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <form className="flex items-center gap-2" onSubmit={handleSend}>
        <button type="button" onClick={() => setShowEmoji((prev) => !prev)} className="text-xl">
          😀
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <button type="button" onClick={() => fileInputRef.current.click()}>
          {uploading ? "Uploading..." : "📎"}
          <input ref={fileInputRef} type="file" onChange={handleFile} className="hidden" />
        </button>
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
