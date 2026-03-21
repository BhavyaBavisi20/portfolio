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

const sendEmail = async ({ subject, text }) => {
  if (String(process.env.DISABLE_EMAIL_NOTIFICATIONS || "false").toLowerCase() === "true") {
    return false;
  }

  const resendFrom = process.env.RESEND_FROM;
  const resendTo = asRecipientList(process.env.RESEND_TO);
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey || !resendFrom || resendTo.length === 0) {
    console.warn("Email disabled: set RESEND_API_KEY, RESEND_FROM, and RESEND_TO.");
    return false;
  }

  await sendViaResend({ subject, text, from: resendFrom, to: resendTo });
  return true;
};

export default sendEmail;
