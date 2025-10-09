import express from "express"
import type { Request, Response } from "express";
import userRouter from "./routes/user";
import noteRoutes from "./routes/notes";

import prisma from "./config/db";
import cors from "cors"
const app = express();
const PORT = 3000;

import cookieParser from "cookie-parser";
app.use(cookieParser());
// Middleware
app.use(express.json());
// ✅ Allow credentials (cookies) from your frontend
app.use(
  cors({
    origin: "http://localhost:5173", // your Vite frontend URL
    credentials: true, // allow sending cookies
  })
);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Hello from Express + TypeScript!");
});

app.use("/api", userRouter);
app.use("/api/notes", noteRoutes);


async function main() {
  await prisma.$connect();
  console.log("✅ Database connected successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Database connection failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
