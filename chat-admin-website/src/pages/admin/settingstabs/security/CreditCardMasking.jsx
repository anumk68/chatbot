import React, { useState } from "react";
import { FileText } from "lucide-react";

const CreditCardMasking = () => {
  const [selected, setSelected] = useState("mask");

  return (
    <div className="w-full h-screen bg-white p-6">
      <div className="w-full bg-white rounded-md">
        {/* Header */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <FileText className="w-5 h-5 text-gray-700 mr-2" />
          <h2 className="text-gray-900 font-medium">Credit card masking</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Masking protects customer credit card numbers in Chats and Archives.
            <br />
            It replaces all but the last 4 digits with X characters.
            <br />
            Example: 370000000000002 will be shown as XXX-XXXX-XXXX-0002.
          </p>

          <h3 className="text-gray-900 font-medium mb-3">
            Credit card policy
          </h3>

          <div className="space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="policy"
                value="show"
                checked={selected === "show"}
                onChange={() => setSelected("show")}
                className="form-radio text-blue-600"
              />
              <span className="text-sm text-gray-700">
                Show customers credit card numbers
              </span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="policy"
                value="mask"
                checked={selected === "mask"}
                onChange={() => setSelected("mask")}
                className="form-radio text-blue-600"
              />
              <span className="text-sm text-gray-700">
                Mask customers credit card numbers
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardMasking;
