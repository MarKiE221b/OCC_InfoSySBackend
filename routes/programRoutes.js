import express from "express";

import {
  addPrograms,
  getAllPrograms,
  getCopcCounts,
  getSUCPrograms,
} from "../controllers/programController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/add-program", authenticateToken, addPrograms);
router.get("/get-programs", authenticateToken, getAllPrograms);
router.get("/get-copc-count", authenticateToken, getCopcCounts);
router.put("/get-suc-program", authenticateToken, getSUCPrograms);

export default router;
