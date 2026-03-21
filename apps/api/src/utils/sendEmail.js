import nodemailer from "nodemailer";

const asRecipientList = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const sendViaResend = async ({ subject, text, from, to }) => {
  const resendApiKey = process.env.RESEND_API_KEY;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
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

const sendViaBrevo = async ({ subject, text, from, to }) => {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderName = process.env.BREVO_SENDER_NAME || "Portfolio Contact";

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": brevoApiKey,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      sender: { email: from, name: senderName },
      to: to.map((email) => ({ email })),
      subject,
      textContent: text
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo request failed: ${response.status} ${errorText}`);
  }

  return true;
};

const sendViaSmtp = async ({ subject, text, from, to }) => {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

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
    from,
    to,
    subject,
    text
  });

  return true;
};

const sendEmail = async ({ subject, text }) => {
  if (String(process.env.DISABLE_EMAIL_NOTIFICATIONS || "false").toLowerCase() === "true") {
    return false;
  }

  const attempts = [];
  const failures = [];
  const defaultTo = process.env.MAIL_TO || process.env.EMAIL_TO;

  const resendFrom = process.env.RESEND_FROM;
  const resendTo = asRecipientList(process.env.RESEND_TO || defaultTo);
  if (process.env.RESEND_API_KEY && resendFrom && resendTo.length > 0) {
    attempts.push({
      provider: "resend",
      execute: () => sendViaResend({ subject, text, from: resendFrom, to: resendTo })
    });
  } else if (process.env.RESEND_API_KEY) {
    console.warn("Resend skipped: set RESEND_FROM and RESEND_TO (or MAIL_TO).");
  }

  const brevoFrom = process.env.BREVO_FROM;
  const brevoTo = asRecipientList(process.env.BREVO_TO || defaultTo);
  if (process.env.BREVO_API_KEY && brevoFrom && brevoTo.length > 0) {
    attempts.push({
      provider: "brevo",
      execute: () => sendViaBrevo({ subject, text, from: brevoFrom, to: brevoTo })
    });
  } else if (process.env.BREVO_API_KEY) {
    console.warn("Brevo skipped: set BREVO_FROM and BREVO_TO (or MAIL_TO).");
  }

  const smtpFrom = process.env.MAIL_FROM || process.env.EMAIL_USER;
  const smtpTo = asRecipientList(defaultTo);
  const hasSmtpConfig =
    Boolean(process.env.SMTP_HOST) &&
    Boolean(process.env.SMTP_USER) &&
    Boolean(process.env.SMTP_PASS) &&
    Boolean(smtpFrom) &&
    smtpTo.length > 0;

  if (hasSmtpConfig) {
    attempts.push({
      provider: "smtp",
      execute: () => sendViaSmtp({ subject, text, from: smtpFrom, to: smtpTo })
    });
  } else if (process.env.SMTP_HOST || process.env.SMTP_USER || process.env.SMTP_PASS) {
    console.warn("SMTP skipped: set SMTP_HOST/SMTP_USER/SMTP_PASS plus MAIL_FROM and MAIL_TO.");
  }

  if (attempts.length === 0) {
    console.warn("Email disabled: no provider configured. Configure RESEND_API_KEY, BREVO_API_KEY, or SMTP_* vars.");
    return false;
  }

  for (const attempt of attempts) {
    try {
      await attempt.execute();
      return true;
    } catch (error) {
      failures.push(`${attempt.provider}: ${error.message}`);
      console.error(`Email via ${attempt.provider} failed:`, error.message);
    }
  }

  throw new Error(`All configured email providers failed. ${failures.join(" | ")}`);
};

export default sendEmail;
