import "./env.js";

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";

if (!jwtSecret) {
  throw new Error("Missing JWT environment variable: JWT_SECRET");
}

export { jwtSecret, jwtExpiresIn };