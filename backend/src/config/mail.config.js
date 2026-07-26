import { google } from "googleapis";
import { createOAuthClient } from "./google.config.js";
import "./env.js";

// --- OLD SMTP implementation (Nodemailer) — blocked on Render ---
// import nodemailer from "nodemailer";
//
// export const createTransporter = async ({ email, refreshToken }) => {
//   const oauth2Client = createOAuthClient({ refreshToken });
//
//   const accessTokenResponse = await oauth2Client.getAccessToken();
//
//   const accessToken =
//     typeof accessTokenResponse === "object"
//       ? accessTokenResponse.token
//       : accessTokenResponse;
//
//   return nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//       type: "OAuth2",
//       user: email,
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       refreshToken,
//       accessToken,
//     },
//   });
// };

/** Build RFC 2822 message and encode as Gmail API base64url raw payload. */
const encodeRawMessage = ({ from, to, subject, message }) => {
  const encodedSubject = /[^\x00-\x7F]/.test(subject)
    ? `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`
    : subject;

  const mime = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${encodedSubject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=utf-8",
    "",
    message,
  ].join("\r\n");

  return Buffer.from(mime)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

/**
 * NEW: Send via Gmail REST API (HTTPS :443).
 * Uses same OAuth refresh token as SMTP, but no smtp.gmail.com connection.
 */
export const sendMailWithGmailApi = async ({
  email,
  refreshToken,
  to,
  subject,
  message,
}) => {
  const auth = createOAuthClient({ refreshToken });
  const gmail = google.gmail({ version: "v1", auth });

  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodeRawMessage({
        from: email,
        to,
        subject,
        message,
      }),
    },
  });

  return {
    messageId: response.data.id,
  };
};
