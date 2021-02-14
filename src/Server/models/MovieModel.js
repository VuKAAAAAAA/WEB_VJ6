const mongoose = require("mongoose");

const {Schema} = mongoose;

const movieModel = new Schema(
    {
    name:{type:String},
    genre:{type:String},
    duration:{type:String, default:false},
    images: [{type: String, default: ''}]
    }
);

module.exports = mongoose.model('Movie', movieModel);