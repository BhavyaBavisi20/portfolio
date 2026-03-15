import express from "express";
import { body } from "express-validator";
import { submitContact } from "../controllers/contactController.js";
import contactLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.post(
  "/",
  contactLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("subject")
      .optional()
      .trim()
      .isLength({ max: 200 })
      .withMessage("Subject is too long"),
    body("message")
      .trim()
      .isLength({ min: 1, max: 2000 })
      .withMessage("Message must be between 1 and 2000 characters")
  ],
  submitContact
);

export default router;
