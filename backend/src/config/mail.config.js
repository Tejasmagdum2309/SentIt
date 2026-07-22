import nodemailer from "nodemailer";
import { createOAuthClient } from "./google.config.js";
import "./env.js";

export const createTransporter = async ({ email, refreshToken }) => {
  const oauth2Client = createOAuthClient({ refreshToken });

  const accessTokenResponse = await oauth2Client.getAccessToken();

  const accessToken =
    typeof accessTokenResponse === "object"
      ? accessTokenResponse.token
      : accessTokenResponse;

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: email,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken,
      accessToken,
    },
  });
};