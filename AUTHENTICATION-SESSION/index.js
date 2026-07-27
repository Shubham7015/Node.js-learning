import "dotenv/config"
import express from "express";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import jwt from 'jsonwebtoken'


const app = express();
app.use(express.json());
app.use(async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  // Header authorization: Bearer <TOKEN>
  if (!tokenHeader) return next();

  try {
    if (!tokenHeader.startsWith('Bearer'))
      return res
        .status(400)
        .json({ error: "Authorization header must start with bearer" });
      
    const token = tokenHeader.split(' ')[1] ;  


    const decodedToken = jwt.verify(token,process.env.JWT_SECRET) ;
    req.user = decodedToken ; 
    next() ; 
  } catch (error) {
    console.error(`Authentication token not matched: ${error}`);
    next(); // treat as unauthenticated rather than crashing the request
  }
});

const PORT = process.env.PORT ?? 8000;

app.get("/", (req, res) => {
  return res.status(200).json({ status: "Server is running successfully" });
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT: ${PORT}`),
);
