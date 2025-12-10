import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";
  const chatbotId = localStorage.getItem("chatbotId");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/customers/all/${chatbotId}`
        );

        if (res.data.success) {
          setCustomers(res.data.customers);
        }
      } catch (err) {
        console.error("Error loading customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [chatbotId]);

  if (loading) return <h2 className="text-center p-4">Loading customers...</h2>;

  return (
    <div className="p-6 mt-16 ml-64">
      <h2 className="text-2xl font-bold mb-4">All Customers</h2>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>

          <tbody>
            {customers.length > 0 ? (
              customers.map((c) => (
                <tr key={c.temp_user_id} className="border hover:bg-gray-50">
                  <td className="p-2 border">{c.name || "N/A"}</td>
                  <td className="p-2 border">{c.email || "N/A"}</td>
                  <td className="p-2 border">{c.phone || "N/A"}</td>
                  <td className="p-2 border">
                    {new Date(c.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 border text-center" colSpan="4">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
