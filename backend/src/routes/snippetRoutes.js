import e from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSnippet,
  deleteSnippet,
  getPublicSnippetById,
  getPublicSnippets,
  getUserSnippetById,
  getUserSnippets,
  updateSnippet,
} from "../controllers/snippets/snippetController.js";

const router = e.Router();

router.post("/create-snippet", protect, createSnippet);

router.get("/snippets/public", protect, getPublicSnippets);

router.get("/snippets", protect, getUserSnippets);

router.get("/snippet/:id", protect, getUserSnippetById);

router.get("/snippet/public/:id", protect, getPublicSnippetById);

router.patch("/snippet/:id", protect, updateSnippet);

router.delete("/snippet/:id", protect, deleteSnippet);

export default router;
