import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const memberSchema = new mongoose.Schema(
  {
    suc_id: { type: String },
    fullname: { type: String, required: true },
    office: { type: String },
    positionOnBoard: { type: String },
    dateOfAppointment: { type: Date },
    durationOfTerm: { type: String },
    expirationOfTerm: { type: Date },
    email: { type: String },
    phoneNumber: { type: String },
    status: { type: String, required: true },
    remarks: { type: String },
    imagePath: { type: String },
  },
  { collection: "members", timestamps: true }
);

export const Members = mongoose.model("Members", memberSchema);
