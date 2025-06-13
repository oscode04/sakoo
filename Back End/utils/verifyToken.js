// utils/verifyToken.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (request, h) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return h.response({ error: "Unauthorized: No token" }).code(401).takeover();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.auth = decoded; // Simpan user payload di request.auth
    return h.continue;
  } catch (err) {
    return h
      .response({ error: "Unauthorized: Invalid token" })
      .code(401)
      .takeover();
  }
};

export default verifyToken;
