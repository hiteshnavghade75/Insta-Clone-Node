const mongoose=require("mongoose");

const InstaSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    postImage:{
        type:String,
        required:true
    },
    likes : {
        type : String,
        default : 0
    },
    date : {
        type : String
    }
})

const model = mongoose.model("Instapost",InstaSchema);
module.exports=model;