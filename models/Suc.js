import mongoose from "mongoose";

const sucSchema = new mongoose.Schema(
  {
    region: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: {
      type: [Number], // An array of [latitude, longitude]
      required: true,
      validate: {
        validator: function (value) {
          return value.length === 2;
        },
        message:
          "Coordinates must have exactly 2 values: [latitude, longitude].",
      },
    },
  },
  { collection: "sucs", timestamps: true }
);

export const Sucs = mongoose.model("Sucs", sucSchema);
