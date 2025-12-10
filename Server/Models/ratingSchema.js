import { Schema, model } from "mongoose";

const ratingSchema = new Schema({
  
  value: {
    type: Number,
    min: 0.5,
    max: 5,
    required: true,
  },
}, { timestamps: true });

const Rating = model("ratings", ratingSchema);
export default Rating;
