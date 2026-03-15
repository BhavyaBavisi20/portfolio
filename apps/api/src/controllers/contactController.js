import { validationResult } from "express-validator";
import Message from "../models/Message.js";
import sendEmail from "../utils/sendEmail.js";

export const submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;
    const normalizedSubject = (subject || "Portfolio Contact").trim();

    const createdMessage = await Message.create({
      name,
      email,
      subject: normalizedSubject,
      message
    });

    await sendEmail({
      subject: `Portfolio Contact: ${normalizedSubject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${normalizedSubject}\n\nMessage:\n${message}`
    });

    return res.status(200).json({
      message: "Contact message submitted successfully",
      id: createdMessage._id
    });
  } catch (error) {
    return next(error);
  }
};
