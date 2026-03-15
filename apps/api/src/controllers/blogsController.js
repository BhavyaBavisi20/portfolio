import mongoose from "mongoose";
import Blog from "../models/Blog.js";

export const getBlogs = async (_req, res, next) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let blog = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findById(id).lean();
    }

    if (!blog) {
      const numericOrder = Number(id);
      if (!Number.isNaN(numericOrder)) {
        blog = await Blog.findOne({ order: numericOrder }).lean();
      }
    }

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.json(blog);
  } catch (error) {
    return next(error);
  }
};
