import { google } from "googleapis";
import jwt from "jsonwebtoken";
import { createOAuthClient, redirectUri } from "../config/google.config.js";
import { jwtExpiresIn, jwtSecret } from "../config/jwt.js";
import { encryptRefreshToken } from "../config/token-encryption.js";
import { upsertUserByGoogleId } from "../services/user.service.js";

export const getGoogleAuthUrlController = (req, res) => {
  try {
    const oauth2Client = createOAuthClient();

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      redirect_uri: redirectUri,
      scope: ["openid", "profile", "email"],
    });
    
    console.log("Google auth URL:", authUrl);
    return res.redirect(authUrl);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const googleCallbackController = async (req, res) => {
  try {
    const { code, error } = req.query;

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Google authorization was denied",
        error,
      });
    }

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Missing authorization code",
      });
    }

    const oauth2Client = createOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);
    console.log("Google tokens:", tokens);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      version: "v2",
      auth: oauth2Client,
    });

    const { data } = await oauth2.userinfo.get();
    console.log("Google user info:", data);

    if (!data.id || !data.email) {
      return res.status(400).json({
        success: false,
        message: "Google account did not return the required identity fields",
      });
    }

    const refreshTokenData = tokens.refresh_token
      ? encryptRefreshToken(tokens.refresh_token)
      : null;

    const user = await upsertUserByGoogleId({
      googleId: data.id,
      name: data.name || data.email,
      email: data.email,
      picture: data.picture || null,
      refreshToken: refreshTokenData,
    });

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Google sign-in completed successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};