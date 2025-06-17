import expressAsyncHandler from "express-async-handler";
import Tags from "../../models/tags/tagsModel.js";

export const bulkAddTags = expressAsyncHandler(async (req, res) => {
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