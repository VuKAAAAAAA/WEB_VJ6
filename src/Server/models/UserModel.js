const mongoose = require("mongoose");

const {Schema} = mongoose;

const userModel = new Schema(
    {
    name:{type:String},
    password:{type:String, required: true},
    email:{type:String, unique: true, dropDups: true, required:true},
    }
);

module.exports = mongoose.model('User', userModel);