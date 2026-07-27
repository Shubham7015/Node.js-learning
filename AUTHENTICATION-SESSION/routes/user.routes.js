import express from "express";
import db from "../db/index.js";
import { usersTable, userSessions } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.patch('/',ensureAuthenticated,async(req,res)=>{
  const user = req.user ; 

  const {name} = req.body;

  await db.update(usersTable).set({name}).where(eq(usersTable.id,user.id)) ;

  return res.json({status:'success'}) ;
})

// Placeholder route for root user routes
router.get("/",ensureAuthenticated, async (req, res) => {
   const user = req.user ;
   return res.status(200).json({user}) ;
});

// User registration endpoint
router.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if a user with the provided email already exists
  const [existingUser] = await db
    .select({
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser) {
    return res.status(400).json({ error: `User with ${email} already exists` });
  }

  // Generate a random salt and hash the password before storing
  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  // Insert the new user record into the database
  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({ id: usersTable.id });

  return res.status(201).json({ status: "success", data: { userId: user.id } });
});

// Login route placeholder
router.post("/login", async (req, res) => {
  try {
    const { email,password } = req.body;

    const [existingUser] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        role:usersTable.role,
        salt: usersTable.salt,
        password: usersTable.password,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!existingUser) {
      return res
        .status(400)
        .json({ error: `User with ${email} does not exists` });
    }

    const salt = existingUser.salt ;
    const existingHash = existingUser.password ; 

    const newHash = createHmac('sha256',salt).update(password).digest('hex') ;

    if (newHash !== existingHash) {
      return res.status(401).json({ message: "password is incorrect" });
    }

      // What data we want to store in the payload 
    const payload = {
      id: existingUser.id ,
      name:existingUser.name,
      role:existingUser.role,
      email:existingUser.email
    }

    const token = jwt.sign(payload,process.env.JWT_SECRET) ; // make a token for particular data using JWT_SECRET
    return res.status(200).json({status:'success',token}) ; // return the token

  } catch (error) {
    console.error(`login failed: ${error}`);
    return res.status(500).json({ error: "failed to log in" });
  }
});

export default router;
