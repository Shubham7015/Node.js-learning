import "dotenv/config"
import express from "express";
import userRouter from "./routes/user.routes.js";
import adminRouter from './routes/admin.routes.js'
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";


const app = express();
app.use(express.json());

app.use(authenticationMiddleware);

const PORT = process.env.PORT ?? 8000;

app.get("/", (req, res) => {
  return res.status(200).json({ status: "Server is running successfully" });
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT: ${PORT}`),
);
