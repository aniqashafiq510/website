import { Schema, model } from "mongoose"

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {                     // 💰 Price (recommended over “budget”)
        type: Number,
        required: true
    },

    images: [
        
        {
            type: Schema.Types.ObjectId,
            ref: "images"
            
        }
    ],

    mileage: {
        type: String,
        required: true
    },

    city: {                     // 🏙️ City filter
        type: String,
        required: true
    },

    brand: {                    // 🚗 Make filter
        type: String,
        required: true
    },

    model: {                    // 🚘 Model filter
        type: String,
        required: true
    },

    year: {                     // 📅 Year filter
        type: Number,
        required: true
    },

    bodyType: {                 // 🚙 Body Type filter
        type: String,
        required: true
    },

    transmission: {
        type: String,
        required: true
    },

    fuelType: {
        type: String,
        required: true
    },

    engine: {
        type: String,
        required: true
    },

    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    phone: {
        type: String,
        required: true
    }

}, { timestamps: true })

const Post = model("posts", postSchema)
export default Post
