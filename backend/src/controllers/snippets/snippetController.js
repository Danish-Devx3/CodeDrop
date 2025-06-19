import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Snippet from "../../models/snippets/snippetModel.js";

export const createSnippet = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, description, code, language, tags, isPublic } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized! please login" })
        }
        if(!title || title.length < 3){
            return res.status(400).json({ message: "Title is required and should be at least 3 characters long" });
        }

        if(!description || description.length < 10){
            return res.status(400).json({ message: "Description is required and should be at least 10 characters long" });
        }

        if(!code || code.length < 30){
            return res.status(400).json({ message: "Code is required and should be at least 30 characters long" });
        }

        if(!tags || tags.length === 0 || !tags.every((tag) => mongoose.Types.ObjectId.isValid(tag))){
            return res.status(400).json({ message: "At least one valid tag is required" });
        }

        const snippet = new Snippet({
            title,
            description,
            code,
            language,
            tags,
            isPublic,
            user: userId
        });

        await snippet.save();
        res.status(201).json(snippet);
    } catch (error) {
        console.log("Error in createSnippet", error)
    }
})