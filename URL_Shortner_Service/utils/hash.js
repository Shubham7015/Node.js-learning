import { randomBytes, createHmac } from "node:crypto";

export const hashPasswordWithSalt = (password) => {
  const salt = randomBytes(256).toString("hex");
  const hashed_password = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  return { salt, password: hashed_password };
};
