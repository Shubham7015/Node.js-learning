import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validations/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const createUserToken = async (payload) => {
  const result = await userTokenSchema.safeParseAsync(payload);

  if (result.error) throw new Error(result.error.message);

  const payloadValidationData = result.data;

  const token = jwt.sign(payloadValidationData, JWT_SECRET);

  return token;
};
