import nodemailer from "nodemailer";

const sendViaResend = async ({ subject, text }) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || process.env.MAIL_FROM;
  const to = process.env.RESEND_TO || process.env.MAIL_TO || process.env.EMAIL_TO;

  if (!resendApiKey || !from || !to) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      text
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend request failed: ${response.status} ${errorText}`);
  }

  return true;
};

const sendViaSmtp = async ({ subject, text }) => {
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

const sendEmail = async ({ subject, text }) => {
  if (String(process.env.DISABLE_EMAIL_NOTIFICATIONS || "false").toLowerCase() === "true") {
    return false;
  }

  const hasResendConfig =
    Boolean(process.env.RESEND_API_KEY) &&
    Boolean(process.env.RESEND_FROM || process.env.MAIL_FROM) &&
    Boolean(process.env.RESEND_TO || process.env.MAIL_TO || process.env.EMAIL_TO);

  if (hasResendConfig) {
    return sendViaResend({ subject, text });
  }

  return sendViaSmtp({ subject, text });
};

export default sendEmail;
