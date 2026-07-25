import express from "express";
import db from "./db/index.js";
import { usersTable, userSessions } from "./db/schema.js";
import { eq } from "drizzle-orm";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json());
app.use(async (req, res, next) => {
  const sessionId = req.headers["session-id"];
  if (!sessionId) return next();

  try {
    const [data] = await db
      .select({
        sessionId: userSessions.id,
        userId: userSessions.userId,
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(userSessions)
      .innerJoin(usersTable, eq(usersTable.id, userSessions.userId))
      .where(eq(userSessions.id, sessionId));

    if (!data) return next();

    req.user = data ;
    next();
  } catch (error) {
    console.error(`session lookup failed: ${error}`);
    next(); // treat as unauthenticated rather than crashing the request
  }
});

const PORT = process.env.PORT ?? 8000;

app.get("/", (req, res) => {
  return res.status(200).json({ status: "Server is running successfully" });
});

app.use("/user", userRouter);

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT: ${PORT}`),
);
