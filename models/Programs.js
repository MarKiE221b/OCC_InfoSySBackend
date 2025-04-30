import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    suc_id: { type: String },
    programName: { type: String, required: true },
    major: { type: String },
    copc: { type: String, required: true },
    dateIssued: { type: Date, required: true },
    chedAccreditation: { type: String, required: true },
    serialNumber: { type: String, required: true },
  },
  { collection: "programs", timestamps: true }
);

export const Programs = mongoose.model("Programs", programSchema);
