import express from "express";
import dns from "node:dns";
import "dotenv/config";
import { connectMongoDB } from "./connection.js";
import  userRouter  from "./routes/user.route.js";
import { authValidation } from "./middlewares/auth.middleware.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
const PORT = process.env.PORT ?? 8000;

connectMongoDB(process.env.DATABASE_URL).then(() =>
  console.log(`DataBase is connected`),
);

app.use(express.json());
app.use(authValidation) ; 

app.use('/user',userRouter) ; 

app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}`);
});
