import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    icon: { type: String, default: "" },
    description: { type: String, required: true, trim: true },
    highlight: { type: String, default: "" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Achievement = mongoose.model("Achievement", achievementSchema);

export default Achievement;
