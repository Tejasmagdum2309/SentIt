import "./env.js";
import { google } from "googleapis";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URI;

if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Missing Google OAuth environment variables: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI");
}

export const createOAuthClient = ({ refreshToken } = {}) => {
    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
    );

    if (refreshToken) {
        oauth2Client.setCredentials({ refresh_token: refreshToken });
    }

    return oauth2Client;
};

export { clientId, clientSecret, redirectUri };