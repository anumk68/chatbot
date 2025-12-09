import express from "express";
import db from "../config/db.js";
// import { format, subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { format } from "date-fns";
import { subDays, startOfMonth, endOfMonth, subMonths } from "date-fns";

const router = express.Router();

// helper: zero-pad date to YYYY-MM-DD
const toYMD = (d) => d.toISOString().slice(0, 10);

// GET /api/analytics/stats/:chatbotId?range=...&date=...
router.get("/stats/:chatbotId", async (req, res) => {
  const { chatbotId } = req.params;
  const range = (req.query.range || "this_week").toLowerCase();
  const dateParam = req.query.date; // for custom

  try {
    // We'll return totals and chartData
    let chartData = [];
    let totals = { visitors: 0, chats: 0, pageViews: 0 };

    const conn = db;

    if (range === "this_week") {
      // last 7 days (including today)
      const startD = subDays(new Date(), 6);
      const rows = await conn.query(
        `SELECT DATE(created_at) as d, COUNT(*) as visitors
         FROM customers
         WHERE chatbot_id = ? AND created_at >= ?
         GROUP BY DATE(created_at)
         ORDER BY DATE(created_at)`,
        [chatbotId, toYMD(startD)]
      );
      const result = rows[0];

      // build full 7-day array
      for (let i = 6; i >= 0; i--) {
        const d = subDays(new Date(), i);
        const ymd = toYMD(d);
        const found = result.find((r) => toYMD(new Date(r.d)) === ymd);
        const visitors = found ? Number(found.visitors) : 0;
        chartData.push({
          label: format(d, "EEE"), // Mon Tue
          date: ymd,
          visitors,
          chats: 0,
          views: 0,
        });
        totals.visitors += visitors;
      }
    } else if (range === "this_month") {
      const start = startOfMonth(new Date());
      const end = endOfMonth(new Date());
      const [rows] = await conn.query(
        `SELECT DATE(created_at) as d, COUNT(*) as visitors
         FROM customers
         WHERE chatbot_id = ? AND created_at >= ? AND created_at <= ?
         GROUP BY DATE(created_at)
         ORDER BY DATE(created_at)`,
        [chatbotId, toYMD(start), toYMD(end)]
      );
      const result = rows;

      // days in month
      const daysInMonth = end.getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const d = new Date(start.getFullYear(), start.getMonth(), day);
        const ymd = toYMD(d);
        const found = result.find((r) => toYMD(new Date(r.d)) === ymd);
        const visitors = found ? Number(found.visitors) : 0;
        chartData.push({
          label: String(day),
          date: ymd,
          visitors,
          chats: 0,
          views: 0,
        });
        totals.visitors += visitors;
      }
    } else if (range === "last_12_months") {
      // aggregated month wise for last 12 months
      const months = [];
      for (let i = 11; i >= 0; i--) {
        const d = subMonths(new Date(), i);
        months.push({
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          date: d,
        });
      }

      // query grouping by YEAR and MONTH
      const [rows] = await conn.query(
        `SELECT YEAR(created_at) as y, MONTH(created_at) as m, COUNT(*) as visitors
         FROM customers
         WHERE chatbot_id = ? AND created_at >= ?
         GROUP BY YEAR(created_at), MONTH(created_at)
         ORDER BY YEAR(created_at), MONTH(created_at)`,
        [chatbotId, toYMD(subMonths(new Date(), 11))]
      );
      const result = rows;

      months.forEach((m) => {
        const found = result.find((r) => r.y === m.year && r.m === m.month);
        const visitors = found ? Number(found.visitors) : 0;
        chartData.push({
          label: format(m.date, "MMM"), // Jan Feb
          month: `${m.year}-${String(m.month).padStart(2, "0")}`,
          visitors,
          chats: 0,
          views: 0,
        });
        totals.visitors += visitors;
      });
    } else if (range === "custom") {
      // expect date=YYYY-MM-DD or ISO; return single-day stats and also totals
      if (!dateParam) {
        return res
          .status(400)
          .json({ success: false, message: "date required for custom" });
      }
      const d = new Date(dateParam);
      const ymd = toYMD(d);

      const [rows] = await conn.query(
        `SELECT DATE(created_at) as d, COUNT(*) as visitors
         FROM customers
         WHERE chatbot_id = ? AND DATE(created_at) = ?
         GROUP BY DATE(created_at)`,
        [chatbotId, ymd]
      );
      const result = rows[0] || null;
      const visitors = result ? Number(result.visitors) : 0;
      chartData.push({
        label: format(d, "dd MMM"),
        date: ymd,
        visitors,
        chats: 0,
        views: 0,
      });
      totals.visitors = visitors;
    } else {
      // default -> this_week
      return res.redirect(`${req.baseUrl}/stats/${chatbotId}?range=this_week`);
    }

    // Optionally: compute chats/pageViews from other tables if present.
    // For now set 0 or placeholder.
    // You (or I) can extend to pull from "messages" or "pageviews" tables.

    return res.json({
      success: true,
      visitors: totals.visitors,
      chats: 0,
      pageViews: 0,
      chartData,
    });
  } catch (err) {
    console.error("analytics error", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// get chat answered or missed stats for a chatbot
router.get("/stats/chats/:chatbotId", async (req, res) => {
  const { chatbotId } = req.params;
  const range = (req.query.range || "this_week").toLowerCase();
  const dateParam = req.query.date;

  try {
    const conn = db;

    let startDate = null;
    let endDate = null;

    const today = new Date();

    // 📌 RANGE HANDLING
    if (range === "this_week") {
      startDate = subDays(today, 6);
      endDate = today;
    } else if (range === "this_month") {
      startDate = startOfMonth(today);
      endDate = endOfMonth(today);
    } else if (range === "last_12_months") {
      startDate = subMonths(today, 11);
      endDate = today;
    } else if (range === "custom" && dateParam) {
      startDate = new Date(dateParam);
      endDate = new Date(dateParam);
    } else {
      startDate = subDays(today, 6);
      endDate = today;
    }

    // Convert to YYYY-MM-DD
    const start = toYMD(startDate);
    const end = toYMD(endDate);

    // ⭐ TOTAL CUSTOMERS in selected range
    const [totalCustomersRows] = await conn.query(
      `SELECT COUNT(*) AS total_customers
       FROM customers
       WHERE chatbot_id = ?
       AND DATE(created_at) BETWEEN ? AND ?`,
      [chatbotId, start, end]
    );

    const totalCustomers = totalCustomersRows[0]?.total_customers || 0;

    // ⭐ ASSIGNED (answered)
    const [assignedRows] = await conn.query(
      `SELECT COUNT(*) AS assigned_count
       FROM assigned_customers
       WHERE chatbot_id = ?
       AND DATE(created_at) BETWEEN ? AND ?`,
      [chatbotId, start, end]
    );

    const assignedCount = assignedRows[0]?.assigned_count || 0;

    // ⭐ MISSED = total - assigned
    const missedCount = totalCustomers - assignedCount;

    return res.json({
      success: true,
      answered: assignedCount,
      missed: missedCount < 0 ? 0 : missedCount,
      start,
      end,
    });
  } catch (err) {
    console.error("chat stats error", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
