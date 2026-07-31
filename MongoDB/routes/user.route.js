import express from "express";
import { User } from "../models/user.model.js";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();
userRouter.patch("/", ensureAuthenticated, async (req, res) => {
  try {
    console.log("body:", req.body);        // is name actually here?
    console.log("user id:", req.user?._id); // is this a valid ObjectId?

    const { name } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ status: "Error", message: "Name is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: "Error", message: "User not found" });
    }

    return res.status(200).json({ status: "Success", user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "Error", message: "Something went wrong" });
  }
});

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existing_user = await User.findOne({ email });

  if (existing_user) {
    return res
      .status(400)
      .json({ message: `User with email ${email} exists already` });
  }

  const salt = randomBytes(256).toString("hex");
  const hash_password = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const user = await User.insertOne({
    name,
    email,
    password: hash_password,
    salt,
  });

  return res.status(201).json({ status: "Success", data: { id: user._id } });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const existing_user = await User.findOne({ email });

  if (!existing_user) {
    return res
      .status(400)
      .json({ message: `user with email ${email} doesn't exists` });
  }

  const salt = existing_user.salt;
  const hashed = existing_user.password;

  const newhashed = createHmac("sha256", salt).update(password).digest("hex");

  if (newhashed !== hashed)
    return res.status(400).json({ message: "Password is incorrect" });

  const payload = {
    _id: existing_user._id,
    name: existing_user.name,
    email: existing_user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.status(200).json({ status: "Success", token });
});

export default userRouter;
