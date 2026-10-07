import express, { type Request, type Response } from "express";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello from Express + TypeScript! 🚀" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
