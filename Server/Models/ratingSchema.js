import { Schema, model } from "mongoose";

const ratingSchema = new Schema({
  
  value: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
}, { timestamps: true });

const Rating = model("ratings", ratingSchema);
export default Rating;
