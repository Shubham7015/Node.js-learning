import express, { type Express , type Response, type Request } from "express";
import path from "path";
import cors from "cors";
import { ApiResponse } from "./utils/api-response.ts";

const app: Express = express();

// cross-origin-resource-sharing configurations 
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
  }),
);
// middlewares to pares data 
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// middleware to give static data (images)
app.use(express.static(path.join(process.cwd(), "public")));


import { healthCheckRouter } from "./routes/healthCheck.route.ts";

// route
app.use("/api/v1/healthcheck",healthCheckRouter)

app.get("/" , (_req:Request,res:Response)=>{
  res.status(200).json(new ApiResponse({message:"server is running"},200))
})


export default app;
