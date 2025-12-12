import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format, addMonths } from "date-fns";

const RANGE_OPTIONS = [
  { key: "this_week", label: "This Week" },
  { key: "this_month", label: "This Month" },
  { key: "last_12_months", label: "Last 12 Months" },
  { key: "custom", label: "Custom" },
];

const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";

const AnalyticsBoard = () => {
  const [selectedRange, setSelectedRange] = useState("this_week");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [visitors, setVisitors] = useState(0);
  const [chats, setChats] = useState(0);
  const [pageViews, setPageViews] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [answeredChats, setAnsweredChats] = useState(0);
  const [missedChats, setMissedChats] = useState(0);

  const chatbotId = localStorage.getItem("chatbotId");

  useEffect(() => {
    fetchAnalytics();
    fetchChatStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange, selectedDate]);

  const fetchChatStats = async () => {
    try {
      const params = { range: selectedRange };
      if (selectedRange === "custom" && selectedDate) {
        params.date = selectedDate.toISOString().slice(0, 10);
      }
      const resp = await axios.get(
        `${API_URL}/analytics/stats/chats/${chatbotId}`,
        { params }
      );
      if (resp.data.success) {
        setAnsweredChats(resp.data.answered || 0);
        setMissedChats(resp.data.missed || 0);
      }
    } catch (err) {
      console.error("Chat stats fetch error", err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const params = { range: selectedRange };
      if (selectedRange === "custom" && selectedDate) {
        params.date = selectedDate.toISOString().slice(0, 10);
      }
      const resp = await axios.get(`${API_URL}/analytics/stats/${chatbotId}`, {
        params,
      });
      if (resp.data.success) {
        setVisitors(resp.data.visitors || 0);
        setChats(resp.data.chats || 0);
        setPageViews(resp.data.pageViews || 0);

        const adapted = resp.data.chartData.map((d) => ({
          ...d,
          label: d.label || d.day || d.month || d.date,
          visitors: Number(d.visitors || 0),
          chats: Number(d.chats || 0),
          views: Number(d.views || 0),
        }));
        setChartData(adapted);
      }
    } catch (err) {
      console.error("fetchAnalytics error", err);
    }
  };

  const handleRangeChange = (value) => {
    setSelectedRange(value);
    if (value === "custom") {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
      setSelectedDate(null);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen w-full">
      {/* Dashboard Header */}
      <div className="bg-white rounded-xl shadow p-4 md:p-5 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h2>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-xl shadow p-4 md:p-5 col-span-2 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <span className="bg-orange-400 text-white px-2 py-1 rounded-md text-xl font-bold">
                D
              </span>
              Historical Analytics
            </h2>

            {/* Range Selector */}
            <div className="flex flex-wrap gap-2 relative">
              {RANGE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  className={`px-3 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300
                    ${
                      selectedRange === opt.key
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                    }`}
                  onClick={() => handleRangeChange(opt.key)}
                >
                  {opt.label}
                </button>
              ))}

              {showCalendar && (
                <div className="absolute top-full mt-2 bg-white shadow-2xl rounded-xl p-3 md:p-4 z-50 w-64 sm:w-72">
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      ◀
                    </button>
                    <h3 className="font-semibold text-gray-700 text-sm md:text-base">
                      {format(currentMonth, "MMMM yyyy")}
                    </h3>
                    <button
                      onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      ▶
                    </button>
                  </div>

                  <div className="grid grid-cols-7 text-center font-semibold text-gray-500 text-xs md:text-sm mb-1">
                    {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                      <div key={d}>{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 text-center gap-1">
                    {Array.from({ length: 31 }).map((_, i) => {
                      const day = new Date();
                      day.setDate(day.getDate() - (30 - i));
                      const ymd = day.toISOString().slice(0, 10);
                      const selected =
                        selectedDate && selectedDate.toISOString().slice(0, 10) === ymd;
                      return (
                        <div
                          key={ymd}
                          className={`p-1 md:p-2 cursor-pointer rounded-full text-xs md:text-sm flex items-center justify-center 
                            ${selected ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
                          onClick={() => setSelectedDate(new Date(ymd))}
                        >
                          {format(day, "d")}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    className="mt-2 w-full bg-blue-600 text-white py-1.5 md:py-2 rounded-lg hover:bg-blue-700 transition-all"
                    onClick={() => setShowCalendar(false)}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Legends */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded"></span> Visitors
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-pink-400 rounded"></span> Chats
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 bg-yellow-500 rounded"></span> Page Views
            </div>
          </div>

          {/* Chart */}
          <div className="w-full h-64 md:h-72 mt-4 md:mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#22c55e" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="chats" stroke="#ec4899" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="views" stroke="#eab308" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
          {/* Visitors */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between">
            <h2 className="text-lg md:text-base font-semibold text-gray-700 mb-1 flex items-center gap-2">
              Customers
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold text-blue-600 animate-pulse">
              {visitors}
            </p>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Total visitors on your website
            </p>
          </div>

          {/* Chats */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col justify-between">
            <h2 className="text-lg md:text-base font-semibold text-gray-700 mb-3">
              Customer Chats
            </h2>

            <div className="flex items-center justify-between gap-4">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-indigo-700">
                  {answeredChats}
                </p>
                <p className="text-gray-600 text-xs md:text-sm">Answered</p>
              </div>

              <div className="text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-red-600">
                  {missedChats}
                </p>
                <p className="text-gray-600 text-xs md:text-sm">Missed</p>
              </div>
            </div>
          </div>

          {/* Page Views */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between">
            <h2 className="text-lg md:text-base font-semibold text-gray-700 mb-1">
              Page Views
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold text-purple-600">{pageViews}</p>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Visitors who viewed multiple pages
            </p>
          </div>

          {/* Reporting */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 xl:col-span-1">
            <h2 className="text-lg md:text-base font-semibold text-gray-700 mb-3">
              Reporting
            </h2>

            {/* Positive Sentiment */}
            <div className="mb-3">
              <div className="flex justify-between mb-1 text-xs md:text-sm">
                <span>Positive Sentiment</span>
                <span className="font-semibold text-red-600">
                  {chats > 0 ? ((answeredChats / chats) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-400 h-2 rounded-full"
                  style={{
                    width: `${chats > 0 ? (answeredChats / chats) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Engagement */}
            <div className="mb-3">
              <div className="flex justify-between mb-1 text-xs md:text-sm">
                <span>Engagement</span>
                <span className="font-semibold text-orange-600">
                  {visitors > 0 ? ((chats / visitors) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-400 h-2 rounded-full"
                  style={{
                    width: `${visitors > 0 ? (chats / visitors) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Availability */}
            <div className="mb-3">
              <div className="flex justify-between mb-1 text-xs md:text-sm">
                <span>Availability</span>
                <span className="font-semibold text-green-600">
                  {answeredChats + missedChats > 0
                    ? ((answeredChats / (answeredChats + missedChats)) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      answeredChats + missedChats > 0
                        ? (answeredChats / (answeredChats + missedChats)) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow p-4 md:p-5 col-span-2">
          <h2 className="text-lg md:text-base font-semibold text-gray-700 mb-4">History</h2>
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <div className="text-6xl mb-3">🕒</div>
            <p>No chat history</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBoard;
