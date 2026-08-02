import express from "express";
import "dotenv/config";
import { userRouter } from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
// app.use(authValidation);

app.get('/',(req,res)=> res.status(200).json('Server is running....')) ; 
app.use('/user',userRouter) ; 



app.listen(PORT, () => {
  console.log(`APP is running on port ${PORT}`);
});
