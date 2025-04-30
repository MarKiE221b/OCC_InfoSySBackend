import express from "express";

import {
  addUser,
  deleteUser,
  fetchUsers,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.get("/fetch-user", authenticateToken, fetchUsers);
router.post("/add-user", authenticateToken, addUser);
router.post("/delete-user", authenticateToken, deleteUser);

export default router;
