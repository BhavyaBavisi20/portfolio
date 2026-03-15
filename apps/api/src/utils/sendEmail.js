import nodemailer from "nodemailer";

const sendEmail = async ({ subject, text }) => {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    throw new Error("Email configuration is incomplete");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: EMAIL_USER,
    to: EMAIL_TO,
    subject,
    text
  });
};

export default sendEmail;
