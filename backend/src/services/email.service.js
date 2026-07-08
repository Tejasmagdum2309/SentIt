import transporter from "../config/mail.config.js";

export const sendEmail = async ({ to, subject, message }) => {
  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message,
  });
};