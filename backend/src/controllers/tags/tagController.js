import asyncHandler from "express-async-handler";
import Tags from "../../models/tags/tagsModel.js";


export const createTag = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const {name} = req.body;

        if(!userId){
            return res.status(400).json({ message: "Not authorised! plss Login"})
        }

        if (!name || name === "") {
            res.status(400).json({ message: "tag name is required" })
        }

        const tag = await Tags.create({ name, user: userId })

        await tag.save();

        return res.status(201).json({ message: "tag created", tag });
        
    } catch (error) {
        console.log("error in createTag", error)
    }
});


export const getTags = asyncHandler(async (req, res) => {
    try {
        const tags = await Tags.find({});

        return res.status(200).json(tags);
    } catch (error) {
        console.log("error in getTag", error);
        return res.status(500).json({ message: "Internal server error" })
    }
});


export const getTagById = asyncHandler(async (req, res) => {
    try {
        const tag = await Tags.findById(req.params.id);

        if (!tag){
            return res.status(404).json({ message: "tag not found" })
        }
        return res.status(200).json(tag);
    } catch (error) {
        console.log("error in get tag by id", error);
        return res.status(500).json({ message: "internal sever error" })
    }
});

export const deleteTag = asyncHandler(async (req, res) => {
    try {
        const tag = await Tags.findByIdAndDelete(req.params.id)

        if(!tag) {
            return res.status(404).json({ message: "tag not found" });
        }

        return res.status(200).json({message: "tag deleted"})
    } catch (error) {
        console.log("error in delete tag", error);
        return res.status(500).json({ message: "internal server error" })
    }
})

// bulk add tags only for admin
export const bulkAddTags = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        const tags = req.body.tags;

        if(!userId){
            return res.status(400).json({ message: "Unauthorized! Login required" });
        }

        if (!Array.isArray(tags) || tags.length === 0) {
            return res.status(400).json({ message: "Tags must be a non-empty array" });
        }

        const newTags = tags.map(tag => ({ name: tag, user: userId }));
        const createdTags = await Tags.insertMany(newTags);

        res.status(201).json({ message: "Tags added successfully",createdTags });
    } catch (error) {
        console.log("Error in bulkAddTags controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});