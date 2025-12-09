import React, { useState } from "react";

const AskForEmail = () => {
  const [activeTab, setActiveTab] = useState("notResponding");
  const [selectedOption, setSelectedOption] = useState("dontSend");
  const [delayMinutes, setDelayMinutes] = useState(2);

  return (
    <div className="flex h-screen bg-gray-50">
      
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-6">Ask for email</h2>

        <div className="space-y-6">
 
          <div className="flex space-x-3">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === "notResponding" 
                  ? "bg-black text-white" 
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("notResponding")}
            >
              When not responding
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === "offline" 
                  ? "bg-black text-white" 
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("offline")}
            >
              When offline
            </button>
          </div>

       
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Decide what happens when a customer sends a message but an agent
              assigned doesn't respond
            </p>

            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="askEmail" 
                  checked={selectedOption === "dontSend"}
                  onChange={() => setSelectedOption("dontSend")}
                />
                <span className="text-sm">Don't send anything</span>
              </label>

              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="askEmail" 
                  checked={selectedOption === "sendAfterDelay"}
                  onChange={() => setSelectedOption("sendAfterDelay")}
                />
                <span className="text-sm">
                  Send a message when an agent doesn't respond for{" "}
                  <input
                    type="number"
                    value={delayMinutes}
                    onChange={(e) => setDelayMinutes(parseInt(e.target.value) || 0)}
                    className="w-14 border border-gray-300 rounded px-1 text-sm text-center"
                    disabled={selectedOption !== "sendAfterDelay"}
                  />{" "}
                  minutes
                </span>
              </label>
            </div>
          </div>
          

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-md font-medium mb-2">Ask for email</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ask visitors to leave their email address when no agents are available to talk
            </p>
            
            <div className="flex items-center space-x-2 mb-4">
              <input 
                type="checkbox" 
                id="askEmailCheckbox" 
                className="rounded"
              />
              <label htmlFor="askEmailCheckbox" className="text-sm">
                Ask visitors for their email address
              </label>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2">Write a message</h4>
              <textarea 
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                rows={3}
                placeholder="Please leave your email address so we can get back to you"
                defaultValue="Please leave your email address so we can get back to you"
              />
              <div className="flex justify-end mt-2">
                <button className="text-sm text-blue-600 font-medium">
                  Insert variable
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="text-sm font-medium">Button label</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md p-2 text-sm mt-1"
                defaultValue="OK"
              />
            </div>
            
            <div className="mt-4">
              <label className="text-sm font-medium">Email placeholder</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md p-2 text-sm mt-1"
                defaultValue="Your email address"
              />
            </div>
          </div>
        </div>
      </div>

    
      <div className="w-[380px] border-l bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-black rounded-xl w-[280px] h-[520px] flex flex-col text-white shadow-lg">
         
          <div className="flex items-center space-x-2 p-3 border-b border-gray-700">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              B
            </div>
            <div>
              <p className="text-sm font-medium">Bhavya Digirushsolutions</p>
              <p className="text-xs text-gray-400">Product Expert</p>
            </div>
          </div>

        
          <div className="flex-1 p-3 space-y-2 text-sm overflow-y-auto">
            <div className="text-gray-300">Hello. How may I help you?</div>
            <div className="bg-blue-600 px-3 py-1 rounded-md self-end max-w-[70%] ml-8">
              I'd like to ask something
            </div>
            <div className="text-gray-300">Go ahead</div>
            
          
            <div className="mt-4 p-3 bg-gray-800 rounded-md">
              <p className="mb-2">Please leave your email address so we can get back to you</p>
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-gray-700 rounded px-2 py-1 text-xs outline-none mb-2"
              />
              <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded float-right">
                OK
              </button>
              <div className="clear-both"></div>
            </div>
          </div>

          <div className="p-3 border-t border-gray-700">
            <input
              type="text"
              placeholder="Write a message..."
              className="w-full bg-gray-800 rounded-md px-3 py-2 text-xs outline-none"
            />
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Powered by <span className="font-semibold">LiveChat</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskForEmail;