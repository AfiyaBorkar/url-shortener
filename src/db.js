require("dotenv").config();

const { Pool } = require("pg");

const dbHost = process.env.DB_HOST || "localhost";
const useSsl = process.env.DB_SSL
  ? process.env.DB_SSL.toLowerCase() === "true"
  : dbHost !== "localhost" && dbHost !== "127.0.0.1";

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: dbHost,
  database: process.env.DB_NAME || "url_shortener",
  password: process.env.DB_PASSWORD || "password",
  port: process.env.DB_PORT || 5432,
  ssl: useSsl
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

// Test the database connection
pool
  .connect()
  .then((client) => {
    console.log("✅ Successfully connected to PostgreSQL!");
    client.release(); // Release connection back to pool
  })
  .catch((err) => console.error("❌ Database connection error:", err));

module.exports = pool;
