import express from "express";
import SkillCategory from "../models/SkillCategory.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const categories = await SkillCategory.find().sort({ order: 1, name: 1 }).lean();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

export default router;
