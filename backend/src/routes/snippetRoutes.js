import e from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createSnippet, getPublicSnippets } from "../controllers/snippets/snippetController.js";

const router = e.Router();

router.post("/create-snippet", protect, createSnippet)

router.get("/snippets/public", protect, getPublicSnippets)

export default router;