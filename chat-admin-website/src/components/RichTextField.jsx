import React, { useEffect, useRef, useState } from "react";

const RichTextField = ({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  rightSection = null,
}) => {
  const ref = useRef(null);
  const [showToolbar, setShowToolbar] = useState(false);

  useEffect(() => {
    if (ref.current && value !== ref.current.innerHTML) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (cmd, arg) => {
    if (!ref.current) return;
    ref.current.focus();
    document.execCommand(cmd, false, arg);
    onChange(ref.current.innerHTML);
  };

  const makeLink = () => {
    const url = window.prompt("Enter URL (include https://)");
    if (url) exec("createLink", url);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-700">
          {label}
          {required ? " *" : ""}
        </p>
        {rightSection}
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onFocus={() => setShowToolbar(true)}
        onBlur={() => setShowToolbar(false)}
        className="min-h-[48px] w-full rounded-md border border-gray-300 p-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        data-placeholder={placeholder}
      />

      <div
        className={`flex items-center gap-1 mt-2 overflow-hidden transition-all duration-300 ${
          showToolbar ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("bold")}
          className="px-2 py-1 text-xs font-semibold border rounded hover:bg-gray-50"
          title="Bold"
        >
          B
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("italic")}
          className="px-2 py-1 text-xs italic border rounded hover:bg-gray-50"
          title="Italic"
        >
          I
        </button>
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={makeLink}
          className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
          title="Insert link"
        >
          🔗
        </button>
      </div>

      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
        }
      `}</style>
    </div>
  );
};

export default RichTextField;
