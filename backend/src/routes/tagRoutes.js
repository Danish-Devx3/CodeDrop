import express from "express";
import { bulkAddTags, createTag, getTags, getTagById, deleteTag } from "../controllers/tags/tagController.js";
import { adminMiddleware, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create-tag", protect, createTag);

router.post('/bulk-tags', protect, adminMiddleware, bulkAddTags);

router.get("/tags", getTags);

router.get("/tag/:id", getTagById);

router.delete("/tag/:id", protect, deleteTag);

export default router;