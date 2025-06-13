// routes/userRoutes.js
import verifyToken from "../utils/verifyToken.js";
import pool from "../db/dbConnection.js";
import bcrypt from "bcrypt";

const userRoutes = [
  // GET /user - Ambil data user berdasarkan JWT
  {
    method: "GET",
    path: "/user",
    options: {
      pre: [{ method: verifyToken }],
    },
    handler: async (request, h) => {
      const userId = request.auth.id;

      console.log("🔑 Decoded JWT Payload:", request.auth);
      console.log("🔍 Mencari user dengan user_id:", userId);

      try {
        const result = await pool.query(
          "SELECT user_id, name, email FROM users WHERE user_id = $1",
          [userId]
        );

        console.log("📦 Hasil query:", result.rows);

        if (result.rows.length === 0) {
          console.warn("❌ User not found untuk user_id:", userId);
          return h.response({ error: "User not found" }).code(404);
        }

        return h.response(result.rows[0]).code(200);
      } catch (error) {
        console.error("💥 Server error:", error);
        return h.response({ error: "Server error" }).code(500);
      }
    },
  },

  // PATCH /user - Update data user berdasarkan JWT
  {
    method: "PATCH",
    path: "/user",
    options: {
      pre: [{ method: verifyToken }],
    },
    handler: async (request, h) => {
      const userId = request.auth.id;
      const { name, email, password } = request.payload;

      if (!name || !email || !password) {
        return h
          .response({ error: "Name, email, and password are required" })
          .code(400);
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
          "UPDATE users SET name = $1, email = $2, password = $3 WHERE user_id = $4",
          [name, email, hashedPassword, userId]
        );

        console.log("✅ User updated:", userId);
        return h
          .response({ message: "User data updated successfully" })
          .code(200);
      } catch (error) {
        console.error("💥 Error saat update user:", error);
        return h.response({ error: "Server error" }).code(500);
      }
    },
  },
];

export default userRoutes;
