import { Request, Response } from "express";
import prisma from "../config/db";
import { randomBytes } from "crypto";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number; 
    email?: string;
  };
}

export const createNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { title, type, content, description, thumbnail, tags } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    if (!title || !type) {
      return res.status(400).json({ message: "Title and type are required" });
    }

    const note = await prisma.note.create({
      data: {
        title,
        type,
        content,
        description,
        thumbnail,
        tags: tags || [],
        userId,
      },
    });

    return res.status(201).json({
      message: "Note added successfully",
      note,
    });
  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};




export const getAllNotes = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { addedDate: "desc" },
    });

    if (notes.length === 0) {
      return res.status(200).json({ message: "No notes found", notes: [] });
    }

    res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNoteById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const noteId = parseInt(req.params.id, 10);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    if (isNaN(noteId)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await prisma.note.findFirst({
      where: { id: noteId, userId },
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note fetched successfully",
      note,
    });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const noteId = parseInt(req.params.id, 10);
    const { title, type, content, description, thumbnail, tags } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    if (isNaN(noteId)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const existingNote = await prisma.note.findFirst({
      where: { id: noteId, userId },
    });

    if (!existingNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        title: title ?? existingNote.title,
        type: type ?? existingNote.type,
        content: content ?? existingNote.content,
        description: description ?? existingNote.description,
        thumbnail: thumbnail ?? existingNote.thumbnail,
        tags: tags ?? existingNote.tags,
      },
    });

    return res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// 🗑️ Delete Note
export const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const noteId = parseInt(req.params.id, 10);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    if (isNaN(noteId)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await prisma.note.findFirst({
      where: { id: noteId, userId },
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    await prisma.note.delete({ where: { id: noteId } });

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const generateShareLink = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { noteId } = req.body;
    const userId = req.user?.id;
    console.log(noteId)

    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note || note.userId !== userId) {
      return res.status(403).json({ message: "You can only share your own notes" });
    }

    const shareId = randomBytes(10).toString("hex");

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        shareId,
        isShared: true,
        sharedAt: new Date(),
      },
    });

    const shareLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/shared/${shareId}`;

    res.json({
      message: "Share link generated successfully",
      shareLink,
      note: updatedNote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const viewSharedNote = async (req: Request, res: Response) => {
  try {
    const { shareId } = req.params;

    const note = await prisma.note.findUnique({
      where: { shareId },
      select: {
        title: true,
        content: true,
        description: true,
        tags: true,
        addedDate: true,
        expiresAt: true
      },
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found or link expired" });
    }

    res.json(note);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
