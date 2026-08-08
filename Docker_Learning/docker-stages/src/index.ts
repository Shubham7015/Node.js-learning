import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { Redis } from "ioredis";
import pg from "pg";

const app: Application = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function init() {
  try {
    console.log(`Connecting Redis...`);
    const redis = new Redis("redis://redis:6379", { lazyConnect: true });
    await redis.connect();
    console.log("Redis connection Success....");

    console.log(`Connecting PostgreSQL...`);

    const { Client } = pg;
    const client = new Client({
      host:"db",
      port:5432,
      database:"postgres",
      user:"postgres",
      password:"postgres",
    });

    await client.connect() ; 

    console.log("Postgres connection Success") ; 

    // Sample route
    app.get("/", (req: Request, res: Response) => {
      res.send("API is running...");
    });

    app.get("/api/hello", (req: Request, res: Response) => {
      res
        .status(200)
        .json({ success: true, message: "Hello from Express + TypeScript!" });
    });

    // 404 handler
    app.use((req: Request, res: Response) => {
      res.status(404).json({ success: false, message: "Route not found" });
    });

    // Error handler
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
