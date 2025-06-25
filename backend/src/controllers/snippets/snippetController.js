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
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
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
      snippets,
    });
  } catch (error) {
    console.log("error in getPublicSnippet", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getUserSnippets = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const tagId = req.query.tagId;
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized Please Login" });
    }

    const query = { user: userId };

    if (tagId) {
      query.tags = { $in: [tagId] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const snippets = await Snippet.find(query)
      .populate("tags", "name")
      .populate("user", "_id name photo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalSnippets = await Snippet.countDocuments({ user: userId });
    return res.status(200).json({
      totalSnippets,
      totalPages: Math.ceil(totalSnippets / limit),
      currentPage: page,
      snippets,
    });
  } catch (error) {
    console.log("error in getUserSnippets", error);
    return res.status(500).json({ message: "internal server error" });
  }
});

export const getUserSnippetById = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const snippetId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized Please Login" });
    }

    const snippet = await Snippet.findOne({ _id: snippetId, user: userId })
      .populate("tags", "name")
      .populate("user", "_id name photo");

    return res.status(200).json(snippet);
  } catch (error) {
    console.log("Error in getUserSnippetById", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getPublicSnippetById = asyncHandler(async (req, res) => {
  try {
    const snippetId = req.params.id;

    const snippet = await Snippet.findOne({ _id: snippetId })
      .populate("tags", "name")
      .populate("user", "_id name photo");

    return res.status(200).json(snippet);
  } catch (error) {
    console.log("Error in getPublicSnippetById", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const updateSnippet = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const snippetId = req.params.id;
    const { title, description, code, language, tags, isPublic } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized Please Login" });
    }

    const snippet = await Snippet.findOne({ _id: snippetId, user: userId });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet Not Found" });
    }

    snippet.title = title || snippet.title;
    snippet.description = description || snippet.description;
    snippet.code = code || snippet.code;
    snippet.language = language || snippet.language;
    snippet.tags = tags || snippet.tags;
    snippet.isPublic = isPublic || snippet.isPublic;

    await snippet.save();
    return res.status(200).json(snippet);
  } catch (error) {
    console.log("Error In update Snippet", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const deleteSnippet = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const snippetId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized Please Login" });
    }

    const snippet = Snippet.findOne({ _id: snippetId, user: userId });

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    await Snippet.deleteOne({ _id: snippetId });

    return res.status(200).json({ message: "Snippet deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteSnippet", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
