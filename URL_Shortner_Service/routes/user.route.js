import express from "express";
import db from "../db/index.js";
import { usersTable } from "../models/index.js";
import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
} from "../validations/request.validation.js";
import { hashPasswordWithSalt } from "../utils/hash.js";
import {
  getUserByEmail,
  insertUserIntoDatabase,
} from "../services/user.service.js";
import "dotenv/config";
import { createUserToken } from "../utils/token.js";

export const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const result = await signupPostRequestBodySchema.safeParseAsync(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten().fieldErrors });
  }

  const { firstname, lastname, email, password } = result.data;

  try {
    const existing_user = await getUserByEmail(email);

    if (existing_user)
      return res
        .status(400)
        .json({ error: `User with ${email} already exists` });

    const { salt, password: hashed_password } = hashPasswordWithSalt(password);

    const id = await insertUserIntoDatabase(
      firstname,
      lastname,
      email,
      salt,
      hashed_password,
    );

    return res.status(201).json({ Status: "Success", data: id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "server is  figuring how to respond" });
  }
});

userRouter.post("/login", async (req, res) => {
  const result = await loginPostRequestBodySchema.safeParseAsync(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten().fieldErrors });
  }

  const { email, password } = result.data;

  try {
    const existing_user = await getUserByEmail(email);

    if (!existing_user)
      return res.status(400).json({ error: `User with ${email} not exists` });

    const { password: hashed_password } = hashPasswordWithSalt(
      password,
      existing_user.salt,
    );

    if (existing_user.password !== hashed_password)
      return res.status(400).json({ error: "Password is incorrect" });

    const token = await createUserToken({ id: existing_user.id });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error while logging" });
  }
});
