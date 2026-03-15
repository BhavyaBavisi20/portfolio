import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    date: { type: String, required: true, trim: true },
    readTime: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
