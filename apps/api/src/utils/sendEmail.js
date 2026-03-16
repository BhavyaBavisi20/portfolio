import nodemailer from "nodemailer";

const sendEmail = async ({ subject, text }) => {
  if (String(process.env.DISABLE_EMAIL_NOTIFICATIONS || "false").toLowerCase() === "true") {
    return false;
  }

  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const mailFrom = process.env.MAIL_FROM || smtpUser;
  const mailTo = process.env.MAIL_TO || process.env.EMAIL_TO;

  if (!smtpUser || !smtpPass || !mailTo || !mailFrom) {
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000
  });

  await transporter.sendMail({
    from: mailFrom,
    to: mailTo,
    subject,
    text
  });

  return true;
};

export default sendEmail;
