import jwt from "jsonwebtoken";

export const generateAccessToken = (details) => {
  return jwt.sign(details, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "50m",
  });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
