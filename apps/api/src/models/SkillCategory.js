import mongoose from "mongoose";

const skillItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    icon: { type: String, default: "" },
    details: { type: String, default: "" }
  },
  { _id: false }
);

const skillCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    skills: [skillItemSchema],
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const SkillCategory = mongoose.model("SkillCategory", skillCategorySchema);

export default SkillCategory;
