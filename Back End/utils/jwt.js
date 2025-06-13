// inisiasi jwt
import { sign, verify } from "jsonwebtoken";
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "secretdefault";

const generateToken = (payload) => {
  return sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  try {
    return verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export default { generateToken, verifyToken };
