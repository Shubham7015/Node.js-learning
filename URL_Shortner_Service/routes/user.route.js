import express from "express";
import db from "../db/index.js";
import { usersTable } from "../models/index.js";
import { signupPostRequestBodySchema } from "../validations/request.validation.js";
import { hashPasswordWithSalt } from "../utils/hash.js";
import { getUserByEmail } from "../services/user.service.js";

export const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const result = await signupPostRequestBodySchema.safeParseAsync(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten().fieldErrors });
  }

  const { firstname, lastname, email, password } = result.data;

  try {
    const existing_user = await getUserByEmail(email) ; 

    if (existing_user)
      return res
        .status(400)
        .json({ error: `User with ${email} already exists` });

    const { salt, password: hashed_password } = hashPasswordWithSalt(password);

    const user = await db
      .insert(usersTable)
      .values({
        firstname,
        lastname,
        email,
        password: hashed_password,
        salt,
      })
      .returning({ id: usersTable.id });

    return res.status(201).json({ Status: "Success", data: user[0].id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "server is not figuring how to respond" });
  }
});
