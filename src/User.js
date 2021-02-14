const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        max: 100,
        min: 4
    },
    password: {
        type: String,
        required: true,
        max:512,
        min: 6
    }
});
module.exports = mongoose.model('User', userSchema);