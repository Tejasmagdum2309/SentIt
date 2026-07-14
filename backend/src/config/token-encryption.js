import crypto from "crypto";
import "./env.js";

const algorithm = "aes-256-gcm";
const keyLength = 32;
const iterations = 100000;
const digest = "sha256";

const encryptionSecret = process.env.REFRESH_TOKEN_ENCRYPTION_SECRET;

if (!encryptionSecret) {
  throw new Error("Missing REFRESH_TOKEN_ENCRYPTION_SECRET environment variable");
}

const deriveKey = (salt) => {
  return crypto.pbkdf2Sync(encryptionSecret, salt, iterations, keyLength, digest);
};

export const encryptRefreshToken = (refreshToken) => {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = deriveKey(salt);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const ciphertext = Buffer.concat([
    cipher.update(refreshToken, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return Buffer.from(
    JSON.stringify({
      ciphertext: ciphertext.toString("base64"),
      salt: salt.toString("base64"),
      iv: iv.toString("base64"),
      authTag: authTag.toString("base64"),
    })
  ).toString("base64");
};

export const decryptRefreshToken = (encryptedRefreshToken) => {
  if (!encryptedRefreshToken) {
    return null;
  }

  const { ciphertext, salt, iv, authTag } = JSON.parse(
    Buffer.from(encryptedRefreshToken, "base64").toString("utf8")
  );

  if (!ciphertext || !salt || !iv || !authTag) {
    return null;
  }

  const saltBuffer = Buffer.from(salt, "base64");
  const ivBuffer = Buffer.from(iv, "base64");
  const authTagBuffer = Buffer.from(authTag, "base64");
  const key = deriveKey(saltBuffer);
  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);

  decipher.setAuthTag(authTagBuffer);

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(ciphertext, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};