
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing Token" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid Token" });
    }
    req.user = user;

    next();
  });
};
