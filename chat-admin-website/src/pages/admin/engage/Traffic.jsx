import React from 'react'

const Traffic = () => {
  return (
    <div>
      {/* Inside your sidebar component, below the menu */}
<div className="p-4 text-white">
  {activeTab === "Traffic" && (
    <div className="flex flex-col gap-4">
      <img
        src="/path-to-install-code-image.png"
        alt="Install Code"
        className="w-full h-auto rounded"
      />
      <h3 className="font-bold text-lg">Install chat widget to see visitors</h3>
      <p className="text-gray-200 text-sm">
        There are visitors waiting on your website. Install the chat widget to
        connect with visitors browsing your site.
      </p>
    </div>
  )}
</div>

    </div>
  )
}

export default Traffic