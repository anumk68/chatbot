import React, { useState } from "react";

const FileSharing = () => {
  const [agentsEnabled, setAgentsEnabled] = useState(true);
  const [visitorsEnabled, setVisitorsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-white p-6">
   
      <h2 className="text-lg font-medium text-gray-800 mb-6">File sharing</h2>

     
      <p className="text-sm text-gray-600 max-w-2xl mb-6">
        Share and receive files during chats. Files that can be a potential
        threat will be automatically filtered out. You can then decide if you
        want to access them or not.{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Learn more
        </a>
      </p>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-gray-700 text-sm">
          <input
            type="checkbox"
            checked={agentsEnabled}
            onChange={() => setAgentsEnabled(!agentsEnabled)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          Agents
        </label>

        <label className="flex items-center gap-2 text-gray-700 text-sm">
          <input
            type="checkbox"
            checked={visitorsEnabled}
            onChange={() => setVisitorsEnabled(!visitorsEnabled)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          Visitors
        </label>
      </div>
    </div>
  );
};

export default FileSharing;