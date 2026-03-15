import express from "express";
import Certificate from "../models/Certificate.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1, createdAt: 1 }).lean();
    res.json(certificates);
  } catch (error) {
    next(error);
  }
});

export default router;
