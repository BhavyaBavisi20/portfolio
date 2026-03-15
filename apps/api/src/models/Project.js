import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    description: { type: String, required: true, trim: true },
    impact: { type: String, default: "" },
    tags: [{ type: String, trim: true }],
    links: {
      demo: { type: String, default: "#" },
      code: { type: String, default: "#" },
      caseStudy: { type: String, default: "#" }
    },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
