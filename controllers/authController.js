import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { Users } from "../models/Users.js";
import { Members } from "../models/Members.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username: username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    if (user.access === false) {
      return res.status(401).json({
        message: "Access denied. Please contact admin.",
      });
    }

    const memberDetails = await Members.findOne({ _id: user.member_id });

    // Generate JWT tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).send({
      ACCESSTOKEN: accessToken,
      role: user.role,
      user_details: memberDetails,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in", error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Forbidden: Invalid token" });

    res.status(200).json({ message: "Token verified", payload: user });
  });
};
