import React, { useEffect, useState } from "react";
import axios from "axios";

const AllWebsites = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";
  const chatbotId = localStorage.getItem("chatbotId");

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const res = await axios.get(`${API_URL}/customer/websites/${chatbotId}`);
        if (res.data.success) {
          setWebsites(res.data.websites);
        }
      } catch (err) {
        console.log("Error fetching websites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, [chatbotId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Pagination Logic
  const totalPages = Math.ceil(websites.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = websites.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow text-white">
        <h1 className="text-3xl font-bold">Chatbot Installed Websites</h1>
        <p className="text-white/80 mt-1">
          List of all websites where your chatbot is embedded
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-xl border">
          <h3 className="text-gray-500 text-sm font-medium">
            Total Embed Script on Websites
          </h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {websites.length}
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white shadow-lg rounded-xl overflow-hidden border">
        <div className="max-h-[60vh] overflow-y-auto custom-scroll">
          <table className="w-full text-left">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-4 font-semibold text-gray-700">#</th>
                <th className="p-4 font-semibold text-gray-700">Website URL</th>
                <th className="p-4 font-semibold text-gray-700">Added On</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((site, index) => (
                  <tr
                    key={site.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">
                      {indexOfFirst + index + 1}
                    </td>
                    <td className="p-4 text-blue-600 underline cursor-pointer">
                      <a href={site.url} target="_blank">
                        {site.url}
                      </a>
                    </td>
                    <td className="p-4 text-gray-600">
                      {new Date(site.added_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-6 text-center text-gray-400" colSpan={3}>
                    No websites found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {websites.length > itemsPerPage && (
        <div className="flex justify-between items-center p-4 mt-4 bg-white shadow rounded-xl">
          <button
            className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition font-medium"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>

          <span className="text-gray-700 font-medium">
            Page <b>{currentPage}</b> of <b>{totalPages}</b>
          </span>

          <button
            className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition font-medium"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllWebsites;
