import express from "express";
import { body } from "express-validator";
import { askChat } from "../controllers/chatController.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many chat requests. Please try again later." }
});

router.post(
  "/",
  chatLimiter,
  [
    body("message")
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage("Message must be between 1 and 1000 characters"),
    body("history").optional().isArray({ max: 12 }).withMessage("History must be an array")
  ],
  askChat
);

export default router;
