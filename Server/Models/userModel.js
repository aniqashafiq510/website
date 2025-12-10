import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name :{
        type: String,
        default :"" ,
        
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordkey: {
        type: String,
        default :""
    },
    phone_number: {
        type:String,
        dafault: ''
    },
    
    isAdmin : {
        type: Boolean,
        default: false
    },

    isBlocked : {
        type:Boolean,
        default: false
    },
    pp : {
        type: Schema.Types.ObjectId,
        ref : "images"
    
    },
    address : {
        type:String,
        default: ''
    }, 
    city : {
        type:String,
        default: ''
    },
    state : {
        type:String,
        default: ''
    },
    country: {
        type:String,
        default: ''
    },
    zipcode : {
        type:String,
        default: ''
    },
    gender : {
        type:String,
        default: ''
    },
    dob : {
        type:String,
        default: ''
    },
    ip_address : {
        type:String,
        default: ''
    },
    role: {
        type: String,
        required: true,
        enum :["admin", "buyer","seller"]}
    
}, {timestamps:true})

const User = model("users", userSchema)
export default User