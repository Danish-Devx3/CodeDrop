import e from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createSnippet } from "../controllers/snippets/snippetController.js";

const router = e.Router();

router.post("/create-snippet", protect, createSnippet)

export default router;