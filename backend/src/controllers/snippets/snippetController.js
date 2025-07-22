import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Snippet from "../../models/snippets/snippetModel.js";
import { json } from "express";

export const createSnippet = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description, code, language, tags, isPublic } = req.body;
    console.log(req.body);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! Please login" });
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
        message: "Code is required and should be at least 10 characters long",
      });
    }

    // check if the tags are valid
    if (
      !tags ||
      tags.length === 0 ||
      !tags.every((tag) => mongoose.Types.ObjectId.isValid(tag))
    ) {
      return res.status(400).json({ message: "Please provide valid tags" });
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

    return res.status(201).json(snippet);
  } catch (error) {
    console.log("Error in createSnippet", error);
    return res.status(500).json({ message: "Internal server error" });
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

    const snippet = await Snippet.findOne({ _id: snippetId, user: userId });

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

export const likeSnippet = asyncHandler(async (req, res) => {
  try {
    const snippetId = req.params.id;
    const userId = req.user._id;

    let snippet = await Snippet.findById(snippetId);

    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }

    if (snippet.likedBy.includes(userId)) {
      snippet.likes--;
      snippet.likedBy = snippet.likedBy.filter(
        (id) => id.toString() !== userId.toString()
      );
      await snippet.save();
      return res.status(200).json({ likes: snippet.likes });
    } else {
      snippet.likes++;
      snippet.likedBy.push(userId);
      await snippet.save();
      return res
        .status(200)
        .json({ message: "Snippet liked successfully", likes: snippet.likes });
    }
  } catch (error) {
    console.log("Error in likeSnippet", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getUserLikedSnippets = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const tagId = req.query.tagId;
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! Please Login" });
    }

    const query = { likedBy: userId };

    if (tagId) {
      query.tags = { $in: [tagId] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
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
    console.log("Error in getUserLikedSnippets", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getLeaderboard = asyncHandler(async (req, res) => {
  try {
    const leaderboard = await Snippet.aggregate([
      {
        $group: {
          _id: "$user",
          totalLikes: { $sum: "$likes" },
          snippetCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userinfo",
        },
      },
      {
        $unwind: "$userinfo",
      },
      {
        $project: {
          name: "$userinfo.name",
          photo: "$userinfo.photo",
          totalLikes: 1,
          _id: "$userinfo._id",
          snippetCount: 1,
          score: {
            $add: [
              { $toInt: "$totalLikes" },
              { $multiply: ["$snippetCount", 10] },
            ],
          },
        },
      },
      {
        $sort: { totalLikes: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.log("Error In getLeaderboard", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
});

export const getPopularSnippets = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const tagId = req.query.tagId;
    const search = req.query.search;

    const skip = (page - 1) * limit;

    const query = { isPublic: true };

    if (tagId) {
      query.tags = { $in: [tagId] };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const popularSnippets = await Snippet.find(query)
      .populate("tags", "name")
      .populate("user", "_id name photo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit * 10);

    const shuffledSnippet = popularSnippets.sort(() => 0.5 - Math.random());
    const topSnippets = shuffledSnippet.slice((page - 1) * limit, page * limit);
    return res.status(200).json({
      totalSnippet: popularSnippets.length,
      totalPages: Math.ceil(popularSnippets.length / limit),
      snippets: topSnippets,
    });
  } catch (error) {
    console.log("Error in getPopularSnippets", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
