import express from "express"
import type { Request, Response } from "express";
import userRouter from "./routes/user";
import prisma from "./config/db";
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Hello from Express + TypeScript!");
});
app.use("/api", userRouter);

async function main() {
  // Test connection by making a simple query
  await prisma.$connect();
  console.log("✅ Database connected successfully!");
  
  // You can add your logic here later (e.g., seeding data)
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
