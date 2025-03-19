import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type: String,required:true},
    email : {type:String,required : true},
    password : {type: String,requird : true},
    createdAt : {type:Date , default : Date.now}
});

export const userModel = mongoose.model("users",userSchema);