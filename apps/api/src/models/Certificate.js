import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    thumb: { type: String, default: "" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
