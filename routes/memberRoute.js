import express from "express";
import multer from "multer";
import {
  addMembers,
  getAllMembers,
  getSUCMembers,
  updateMemberProfile,
  deleteMember,
} from "../controllers/memberController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();
const upload = multer({
  dest: "uploads/", // Store files in 'uploads/' folder
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post(
  "/add-member",
  authenticateToken,
  upload.single("image"),
  addMembers
);
router.put("/get-suc-member", authenticateToken, getSUCMembers);
router.get("/get-all-member", getAllMembers);
router.post(
  "/member-update",
  authenticateToken,
  upload.single("image"),
  updateMemberProfile
);
router.post("/delete-member", authenticateToken, deleteMember);

export default router;
