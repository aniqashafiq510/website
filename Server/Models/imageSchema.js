import { model, Schema } from "mongoose";

const imageSchema = new Schema({
  url : {
    type: String,
    required : true
  },
  key : {
    type: String,
    required : true,
    unique : true
  }
  
}, {timestamps: true})

const Image = model("images", imageSchema)

export default Image