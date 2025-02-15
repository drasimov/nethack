"use server"
import mysql from "mysql2/promise";
const pool=mysql.createPool({
    host:"localhost",
    user:process.env.SQL_USERNAME,
    password:process.env.SQL_PASSWORD,
    database:"nethack",
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});
    pool.on('error', (err) => { console.error('MySQL connection error:', err);
});
// export default connection;

export default async function getConnection() {
    return await pool.getConnection();
}

export async function getUser(email) { // Fixed function name
    try {
        const [rows] = await pool.query(
            "SELECT access, teamID FROM users WHERE email = ?", // Actual columns
            [email]
        );
        return rows[0] || null;
    } catch (error) {
        console.error("Database error:", error);
        return null;
    }
}

