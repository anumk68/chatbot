import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";

const Tags = () => {
  const [remind, setRemind] = useState(false);

  const tags = [
    { name: "complaint", author: "LiveChat", date: "23 August 2025" },
    { name: "positive feedback", author: "LiveChat", date: "23 August 2025" },
    { name: "sales", author: "LiveChat", date: "23 August 2025" },
    { name: "spam", author: "LiveChat", date: "23 August 2025" },
    { name: "support", author: "LiveChat", date: "23 August 2025" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900 font-medium text-lg flex items-center gap-2">
          <span className="inline-block w-5 h-5 rounded-sm border border-gray-400" /> 
          Tags
        </h2>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-6">
        Tags help you categorize and organize your chats. Use them to filter
        results in Archives, as well as narrow down data in Reports.{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Learn more
        </a>
      </p>

      {/* Manage tags header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tag"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Create tag
          </button>
        </div>

        {/* Remind toggle */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Remind agents to tag</span>
          <button
            onClick={() => setRemind(!remind)}
            className={`w-10 h-6 rounded-full relative transition-colors duration-200 ${
              remind ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                remind ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

 
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-2 font-medium">Tag</th>
              <th className="text-left px-4 py-2 font-medium">Author</th>
              <th className="text-left px-4 py-2 font-medium">Date</th>
              <th className="text-left px-4 py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag, idx) => (
              <tr
                key={idx}
                className={`border-t border-gray-200 ${
                  idx === 1 ? "bg-gray-50" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                    {tag.name}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img
                    src="icon-livechat.svg"
                    alt="LiveChat"
                    className="w-5 h-5"
                  />
                  {tag.author}
                </td>
                <td className="px-4 py-3 text-gray-600">{tag.date}</td>
                <td className="px-4 py-3 text-blue-600 flex items-center justify-between">
                  <button className="hover:underline">Reports</button>
                  <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tags;
