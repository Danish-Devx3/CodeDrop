import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Snippet from "../../models/snippets/snippetModel.js";

export const createSnippet = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description, code, language, tags, isPublic } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! please login" });
    }
    if (!title || title.length < 3) {
      return res.status(400).json({
        message: "Title is required and should be at least 3 characters long",
      });
    }

    if (!description || description.length < 10) {
      return res.status(400).json({
        message:
          "Description is required and should be at least 10 characters long",
      });
    }

    if (!code || code.length < 30) {
      return res.status(400).json({
        message: "Code is required and should be at least 30 characters long",
      });
    }

    if (
      !tags ||
      tags.length === 0 ||
      !tags.every((tag) => mongoose.Types.ObjectId.isValid(tag))
    ) {
      return res
        .status(400)
        .json({ message: "At least one valid tag is required" });
    }

    const snippet = new Snippet({
      title,
      description,
      code,
      language,
      tags,
      isPublic,
      user: userId,
    });

    await snippet.save();
    res.status(201).json(snippet);
  } catch (error) {
    console.log("Error in createSnippet", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getPublicSnippets = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const userId = req.query.userId;
    const tagId = req.query.tagId;
    const search = req.query.search;

    const skip = (page - 1) * limit;

    const query = { isPublic: true };

    if (userId) {
      query.user = userId;
    }

    if (tagId) {
      query.tags = tagId;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $option: "i" } },
        { description: { $regex: search, $option: "i" } },
      ];
    }

    const snippets = await Snippet.find(query)
      .populate("tags", "name")
      .populate("user", "_id name photo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalSnippets = await Snippet.countDocuments(query);

    return res.status(200).json({
        totalSnippets,
        totalPages: Math.ceil(totalSnippets / limit),
        currentPage: page,
        snippets
    });
  } catch (error) {
    console.log("error in getPublicSnippet", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
