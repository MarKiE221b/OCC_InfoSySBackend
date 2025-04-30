import express from "express";

import { login, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.put("/verify", verifyToken);

export default router;
