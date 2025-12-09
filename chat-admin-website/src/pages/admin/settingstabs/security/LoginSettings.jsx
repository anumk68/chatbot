import React from 'react'
import { Lock , Settings} from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
const LoginSettings = () => {
  const text =
    "Decide how your team should log in to Text products to make the login process easy and secure. Choose between email and password, Google login, Custom SSO, and more.";

  // Split text into words
  const words = text.split(" ");

  // Group words into chunks of 11
  const chunkSize = 11;
  const lines = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    lines.push(words.slice(i, i + chunkSize).join(" "));
  }

  return (
<div className="w-full">
  <div className="text-sm font-sm">Login settings</div>
  <div className="border-b border-gray-300 mt-2"></div>

<div className="bg-gray-100 mt-6 pl-8 pr-0 py-12 rounded-xl w-[45%]">
  <div className="flex gap-6">
    {/* Left Section */}
    <div className="w-[55%]">
      <h2 className="font-bold text-[14px]">
        Choose authentication method for your team
      </h2>
      <p className="mt-2 text-sm text-[12px] leading-6">
        {lines.map((line, index) => (
          <span key={index} className="block">
            {line}
          </span>
        ))}
      </p>

      <button className="bg-blue-600 text-[12px] text-white px-3 py-1 rounded-lg mt-2">
        Go to login settings
      </button>
    </div>

    {/* Right Section */}
    <div className="flex flex-col gap-2 w-[45%]">
     <div className="bg-white shadow rounded-l-xl rounded-r-none px-4 py-6 flex items-center gap-2 shadow">
  <Lock size={16} className="text-gray-600" />
  <div>
    <h3 className="text-sm">Any method</h3>
   
  </div>
</div>
          <div className="bg-white shadow rounded-l-xl rounded-r-none px-4 py-6 flex items-center gap-2 shadow">
 <FcGoogle size={18} />
  <div>
    <h3 className="text-sm">Any method</h3>
   
  </div>
</div>

        <div className="bg-white shadow rounded-l-xl rounded-r-none px-4 py-6 flex items-center gap-2 shadow">
  <Settings size={16} className="text-gray-600" />
  <div>
    <h3 className="text-sm">Any method</h3>
   
  </div>
</div>
    </div>
  </div>
</div>


</div>

  )
}

export default LoginSettings