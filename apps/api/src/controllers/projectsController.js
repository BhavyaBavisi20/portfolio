import mongoose from "mongoose";
import Project from "../models/Project.js";

export const getProjects = async (_req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: 1 }).lean();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let project = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      project = await Project.findById(id).lean();
    }

    if (!project) {
      const numericOrder = Number(id);
      if (!Number.isNaN(numericOrder)) {
        project = await Project.findOne({ order: numericOrder }).lean();
      }
    }

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json(project);
  } catch (error) {
    return next(error);
  }
};
