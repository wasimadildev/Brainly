import express from "express";
import { createNote , getAllNotes, getNoteById, updateNote, deleteNote , viewSharedNote, generateShareLink} from "../controllers/notes";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

// POST /api/notes
router.post("/", verifyToken, createNote);
router.get("/", verifyToken, getAllNotes);
router.get("/:id", verifyToken, getNoteById);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);
router.post("/share", verifyToken, generateShareLink);
router.get("/shared/:shareId", viewSharedNote);

export default router;
