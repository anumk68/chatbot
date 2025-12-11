import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Users } from "lucide-react";

export default function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const customersPerPage = 7;
  const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";
  const chatbotId = localStorage.getItem("chatbotId");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/customer/customers/all/${chatbotId}`
        );
        if (res.data.success) setCustomers(res.data.customers);
      } catch (err) {
        console.error("Error loading customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [chatbotId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );

const filteredCustomers = customers.filter((c) => {
  const text = search.toLowerCase().trim();

  const name = (c.name || "").toLowerCase();
  const email = (c.email || "").toLowerCase();
  const phone = (c.phone || "").toLowerCase();

  return (
    name.includes(text) ||
    email.includes(text) ||
    phone.includes(text)
  );
});


  const indexOfLast = currentPage * customersPerPage;
  const indexOfFirst = indexOfLast - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen transition-all">
      {/* Header */}
      <div className="relative p-8 rounded-3xl shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden">
        <div className="absolute right-8 bottom-8 opacity-25">
          <Users size={70} />
        </div>
        <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-xl">
          All Customers
        </h2>
        <p className="text-sm text-white/80 mt-2">
          List of Customers
        </p>
      </div>

      {/* Search */}
      <div className="mt-6 flex justify-start">
        <div className="relative w-full md:w-1/2">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white shadow-md focus:ring-2 focus:ring-blue-600 outline-none text-gray-700 placeholder-gray-400"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        <div className="max-h-[65vh] overflow-y-auto custom-scroll">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-gray-200 shadow-sm">
              <tr className="text-gray-700 text-left font-semibold border-b text-xl">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Phone</th>
                <th className="p-4 font-semibold">Created At</th>
              </tr>
            </thead>

            <tbody>
              {currentCustomers.length > 0 ? (
                currentCustomers.map((c) => (
                  <tr
                    key={c.temp_user_id}
                    className="border-b text-lg last:border-none hover:bg-blue-50 hover:shadow-sm transition cursor-pointer"
                  >
                    <td className="p-4 font-medium text-gray-900">
                      {c.name || "N/A"}
                    </td>
                    <td className="p-4 text-gray-700">{c.email || "N/A"}</td>
                    <td className="p-4 text-gray-700">{c.phone || "N/A"}</td>
                    <td className="p-4 text-gray-700">
                      {new Date(c.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-6 text-center text-gray-400" colSpan="4">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredCustomers.length > customersPerPage && (
        <div className="flex justify-between items-center p-4 mt-4 bg-white rounded-xl shadow">
          <button
            className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition font-medium"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>

          <span className="text-gray-700 font-semibold">
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
}
