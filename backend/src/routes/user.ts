import express from "express";
import { signup, signin, profile } from "../controllers/user";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", verifyToken, profile);



export default router;
