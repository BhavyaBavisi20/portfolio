import { validationResult } from "express-validator";
import { answerPortfolioQuestion } from "../services/chatService.js";

export const askChat = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const { message, history = [] } = req.body;
    const result = await answerPortfolioQuestion({
      question: String(message || ""),
      history: Array.isArray(history) ? history : []
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};
