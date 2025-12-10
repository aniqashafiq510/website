import {Schema, model} from 'mongoose'

const reviewSchema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
         
        // unique : true is used to make sure that the user can make a review for just once
},
Rating: {
    type: Schema.Types.ObjectId,
    ref:"ratings"
},
userImage: {
    type:Schema.Types.ObjectId,
    ref: "images",
    
},
comment: {
    type:String,
    required: true
}
}, {timestamps: true})


const Reviews = model("reviews",reviewSchema)
export default Reviews