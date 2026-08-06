import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";




const app: Application = express();
const PORT = 8000 ;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route
app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Hello from Express + TypeScript!" });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});