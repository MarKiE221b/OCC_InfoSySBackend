import express from "express";

import { addSucs, getSucs, updateSucs } from "../controllers/sucController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/add-suc", authenticateToken, addSucs);
router.post("/update-suc", authenticateToken, updateSucs);
router.get("/get-sucs", authenticateToken, getSucs);

export default router;
