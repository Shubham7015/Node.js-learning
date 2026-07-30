import express ,{type Express , Response ,Request} from "express";
import  petrouter from './routes/pets.route.js'
import cors from "cors";


const app: Express = express();
app.use(cors());

const PORT: number = 8000;

app.use('/pets',petrouter) ; 
app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: "Route not found!" });
});
app.listen(PORT, (): void => {
  console.log(`App is running on PORT ${PORT} successfully`);
});
