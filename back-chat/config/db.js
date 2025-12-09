import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let db;

async function initDB() {
  try {
    db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    await db.query("SELECT 1");
    console.log(" MySQL Connected Successfully!");
  } catch (error) {
    console.error(" MySQL Connection Failed:", error);
  }
}

await initDB();
export default db;
