import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/dbConnection.js";
import dotenv from "dotenv";

dotenv.config();

const authRoutes = [
  {
    method: "POST",
    path: "/register",
    handler: async (request, h) => {
      const { name, email, password } = request.payload;

      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        if (rows.length > 0) {
          return h.response({ error: "User already exists" }).code(400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
          "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
          [name, email, hashedPassword]
        );

        return h
          .response({ message: "User registered successfully" })
          .code(201);
      } catch (err) {
        console.error(err);
        return h.response({ error: "Internal Server Error" }).code(500);
      }
    },
  },

  {
    method: "POST",
    path: "/login",
    handler: async (request, h) => {
      const { email, password } = request.payload;

      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        const user = rows[0];

        if (!user) {
          return h.response({ error: "Invalid email or password" }).code(401);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return h.response({ error: "Invalid email or password" }).code(401);
        }

        const token = jwt.sign(
          { id: user.user_id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        return h.response({ message: "Login successful", token }).code(200);
      } catch (err) {
        console.error(err);
        return h.response({ error: "Internal Server Error" }).code(500);
      }
    },
  },
];

export default authRoutes;
