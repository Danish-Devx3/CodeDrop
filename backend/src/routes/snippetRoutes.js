import e from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSnippet,
  deleteSnippet,
  getLeaderboard,
  getPopularSnippets,
  getPublicSnippetById,
  getPublicSnippets,
  getUserLikedSnippets,
  getUserSnippetById,
  getUserSnippets,
  likeSnippet,
  updateSnippet,
} from "../controllers/snippets/snippetController.js";

const router = e.Router();

router.post("/create-snippet", protect, createSnippet);

router.get("/snippets/public", getPublicSnippets);

router.get("/snippets", protect, getUserSnippets);

router.get("/snippet/:id", protect, getUserSnippetById);

router.get("/snippet/public/:id", getPublicSnippetById);

router.patch("/snippet/:id", protect, updateSnippet);

router.delete("/snippet/:id", protect, deleteSnippet);

router.patch("/snippet/like/:id", protect, likeSnippet);

router.get("/snippets/liked", protect, getUserLikedSnippets);

router.get("/leaderboard", getLeaderboard);

router.get("/snippets/popular", getPopularSnippets);

export default router;
