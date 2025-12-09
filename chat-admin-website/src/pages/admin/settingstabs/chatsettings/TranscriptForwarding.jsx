import React from "react";

const TranscriptForwarding = () => {
  return (
    <div className="min-h-screen bg-white p-6">
     
      <h2 className="text-lg font-medium text-gray-800 mb-6">
        Transcript forwarding
      </h2>

 
      <p className="text-sm text-gray-600 max-w-2xl mb-6">
        Automatically forward your chat transcripts to a list of email addresses. <br />
        Chats archived before setting up transcript forwarding will not be sent.{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Learn more
        </a>
      </p>

   
      <div className="max-w-md">
        <label className="text-sm font-medium text-gray-700 block mb-2">
          Forward all chat transcript to email
        </label>
        <input
          type="email"
          placeholder="name@company.com"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p className="text-xs text-gray-500 mt-2">
          Hit enter or space to add a new one. You can add up to 1 email address.
        </p>
      </div>
    </div>
  );
};

export default TranscriptForwarding;