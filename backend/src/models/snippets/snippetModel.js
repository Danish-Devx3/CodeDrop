import mongoose from "mongoose";
import slugify from "slugify"

const SnippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLenghth: 3
    },

    code: {
        type: String,
        required: true,
        trim: true,
        default: "// Add your ci=ode here"
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    language: {
        type: String,
        default: "JavaScript"
    },

    icon: {
        type: String,
        trim: true
    },

    likes: {
        type: Number,
        default: 0
    },

    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    bookmarkedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    slug:{
        type: String,
        unique: true,
        index: true,
        trim: true
    },

    isPublic: {
        type: Boolean,
        default: true
    },

    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tags",
            required: true
        }
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    
},
{ timestamps: true }
);

SnippetSchema.pre("save", async function (next) {
    try {
        if (!this.slug){
            this.slug = slugify(this.title, {
                lower:true,
                strict:true,
                replacement:"-"
            });
        }

        let isSlugExit = await mongoose.models.Snippet.findOne({slug: this.slug});
        let suffix = 1;

        while(isSlugExit){
            this.slug = `${slugify(this.title, {
                lower: true,
                strict: true,
                replacement: "-"
            })}-${suffix}`;
            isSlugExit = await mongoose.models.Snippet.findOne({slug: this.slug});
            suffix++;
        }
    } catch (error) {
        console.log("Error in generating slug", error);
        return next(error);
    }
})

const Snippet = mongoose.model("Snippet", SnippetSchema);

export default Snippet