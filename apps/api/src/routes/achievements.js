import express from "express";
import Achievement from "../models/Achievement.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const achievements = await Achievement.find().sort({ order: 1, createdAt: 1 }).lean();
    res.json(achievements);
  } catch (error) {
    next(error);
  }
});

export default router;
