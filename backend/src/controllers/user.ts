import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/db";
import { IUser } from "../types/user.types";
import { IJwtPayload } from "../types/jwt.types";
import { AuthRequest } from "../middlewares/auth";
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Signup
export const signup = async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body;
  console.log(req.body); // Log the request body to debug the issue
  console.log(name, email, password); // Log individual fields to debug the issue als

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ success: true, message: "Signup successful", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Signin
export const signin = async (req: Request, res: Response) => {
  const { email, password }: IUser = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  
   res
  .cookie("token", token, {
    httpOnly: true, // prevents JS access
    secure:false,
    //secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
  .json({
    success: true,
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email },
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const profile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Fetch full user data from DB
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};