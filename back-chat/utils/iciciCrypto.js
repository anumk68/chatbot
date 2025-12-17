import crypto from "crypto";

export const encrypt = (text, key) => {
  const cipher = crypto.createCipheriv(
    "aes-128-ecb",
    Buffer.from(key),
    null
  );
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

export const decrypt = (text, key) => {
  const decipher = crypto.createDecipheriv(
    "aes-128-ecb",
    Buffer.from(key),
    null
  );
  let decrypted = decipher.update(text, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
