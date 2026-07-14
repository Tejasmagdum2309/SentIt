import { createTransporter } from "../config/mail.config.js";
import { decryptRefreshToken } from "../config/token-encryption.js";

export const sendEmail = async ({ user, to, subject, message }) => {
  const refreshToken = decryptRefreshToken(user?.refreshToken);

  if (!user?.email || !refreshToken) {
    throw new Error("Authenticated Google user with refresh token is required to send email");
  }

  const transporter = await createTransporter({
    email: user.email,
    refreshToken,
  });

  return transporter.sendMail({
    from: user.email,
    to,
    subject,
    text: message,
  });
};